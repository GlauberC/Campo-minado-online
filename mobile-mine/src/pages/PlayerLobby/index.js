import React, { useState, useEffect, useMemo } from "react";
import { FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import {
  Container,
  PlayersContainer,
  Player,
  PlayerName,
  PlayerNumber,
  Box,
  CloseBtn,
  CloseBtnText
} from "./styles";

export default function PlayerLobby({ navigation }) {
  const [players, setPlayers] = useState([]);

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
  socket.on("disconnectPlayer", data => {
    setPlayers(data);
  });

  function handleReady() {
    socket.emit("changeReady", nameMyUser);
  }
  function handleDisconnect() {
    socket.emit("disconnectPlayer", nameMyUser);
    navigation.navigate("EnterPage");
  }

  return (
    <Container>
      <PlayersContainer>
        <FlatList
          data={players}
          keyExtractor={player => player.id}
          renderItem={({ item }) => (
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
      <CloseBtn onPress={handleDisconnect}>
        <CloseBtnText>desconectar</CloseBtnText>
        <MaterialIcons name='close' size={25} color='#fff' />
      </CloseBtn>
    </Container>
  );
}
