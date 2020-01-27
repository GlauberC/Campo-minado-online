import React, { useState, useEffect } from "react";
import { FlatList, Alert, View, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import {
  Container,
  PlayersContainer,
  Player,
  PlayerName,
  PlayerNumber,
  Box,
  CloseBtn,
  CloseBtnText,
  StartButton,
  StartButtonText,
  EmergencyBtn,
  OnePlayerView,
  SliderView,
  SliderText,
  Slide,
  ErrMsg
} from "./styles";

export default function PlayerLobby({ navigation }) {
  const [players, setPlayers] = useState([]);
  const [emergencyCount, setEmergencyCount] = useState(10);
  const [numBomb, setNumBomb] = useState(20);
  const [numLine, setNumLine] = useState(8);
  const [numColumn, setNumColumn] = useState(5);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const socket = navigation.getParam("socket");
  const socketUsers = navigation.getParam("users");
  const nameMyUser = navigation.getParam("nameMyUser");

  useEffect(() => {
    setPlayers(socketUsers);
  }, []);

  socket.on("users", data => {
    setPlayers(data);
  });
  socket.on("listenReady", data => {
    setPlayers(data);
  });
  socket.on("allReadyErr", data => {
    setErrMsg(data);
  });
  socket.on("disconnectPlayer", data => {
    setPlayers(data);
  });
  socket.on("startGame", data => {
    setErrMsg("");
    setLoading(true);
    if (data.start) {
      setLoading(false);
      navigation.navigate("FieldPage", {
        players,
        socket,
        game: data.game,
        nameMyUser,
        mineField: data.mineField
      });
    }
  });

  function handleReady() {
    socket.emit("changeReady", nameMyUser);
  }
  function handleDisconnect() {
    socket.emit("disconnectPlayer", nameMyUser);
    navigation.navigate("EnterPage");
  }
  function handleStart() {
    setErrMsg("");
    if (numBomb > numLine * numColumn * 0.6) {
      setErrMsg("O número de bombas não pode ser maior que 60% do campo");
    } else {
      socket.emit("requestStartGame", {
        name: nameMyUser,
        numBomb,
        numLine,
        numColumn
      });
    }
  }
  function handleEmergency() {
    setEmergencyCount(emergencyCount - 1);
    if (emergencyCount <= 0) {
      socket.emit("emergencyCall");
      setEmergencyCount(10);
      navigation.navigate("EnterPage");
      Alert.alert("Emergency Call", "Todo mundo foi retirado do lobby");
    }
  }

  return (
    <Container>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <PlayersContainer>
            <FlatList
              data={players}
              keyExtractor={player => player.id}
              renderItem={({ item, index }) => (
                <Player>
                  <PlayerName>{item.name}</PlayerName>

                  {item.id === socket.id ? (
                    <Box
                      pressed={item.ready}
                      onPress={() => handleReady(item.name)}
                    >
                      {item.ready && (
                        <MaterialIcons name='done' size={25} color='#21301e' />
                      )}
                    </Box>
                  ) : (
                    item.ready && (
                      <MaterialIcons name='done' size={25} color='#21301e' />
                    )
                  )}
                </Player>
              )}
            />
          </PlayersContainer>
          <PlayerNumber>{players.length} players connected</PlayerNumber>
          {players.length > 0 && players[0].id === socket.id && (
            <OnePlayerView>
              <SliderView>
                <Slide
                  step={1}
                  maximumValue={50}
                  minimumValue={5}
                  onValueChange={setNumBomb}
                  value={numBomb}
                />
                <SliderText>{numBomb} bombas</SliderText>
              </SliderView>
              <SliderView>
                <Slide
                  step={1}
                  maximumValue={20}
                  minimumValue={5}
                  onValueChange={setNumLine}
                  value={numLine}
                />
                <SliderText>{numLine} linhas</SliderText>
              </SliderView>
              <SliderView>
                <Slide
                  step={1}
                  maximumValue={8}
                  minimumValue={3}
                  onValueChange={setNumColumn}
                  value={numColumn}
                />
                <SliderText>{numColumn} colunas</SliderText>
              </SliderView>
              <ErrMsg>{errMsg}</ErrMsg>
              <StartButton onPress={handleStart}>
                <StartButtonText>Começar Partida</StartButtonText>
              </StartButton>
            </OnePlayerView>
          )}
          <CloseBtn onPress={handleDisconnect}>
            <CloseBtnText>desconectar</CloseBtnText>
            <MaterialIcons name='close' size={25} color='#fff' />
          </CloseBtn>
          <EmergencyBtn onPress={handleEmergency} />
        </>
      )}
    </Container>
  );
}
