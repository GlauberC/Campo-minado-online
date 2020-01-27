import React, { useState, useEffect } from "react";
import { RefreshControl, Text, FlatList } from "react-native";
import colorNumber from "../../util/colorNumber";

import { MaterialIcons } from "@expo/vector-icons";

import {
  Container,
  Field,
  Line,
  CellChoice,
  CellEmpty,
  CellNumber,
  CellBomb,
  CellNumberText,
  BtnScore,
  BtnScoreText,
  ModalScreen,
  ModalView,
  BackGameBtn,
  BackGameBtnText,
  Player,
  PlayerName,
  PlayerPoints,
  InfoTurn
} from "./styles";

export default function FieldPage({ navigation }) {
  const [mineField, setMineField] = useState({});
  const [players, setPlayers] = useState({});
  const [game, setGame] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const socket = navigation.getParam("socket");
  const nameMyUser = navigation.getParam("nameMyUser");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const mine = navigation.getParam("mineField");
    const plays = navigation.getParam("players");
    const gameInital = navigation.getParam("game");

    setGame(gameInital);
    setMineField(mine);
    setPlayers(plays);
  }, []);

  socket.on("getMineField", data => {
    setMineField(data);
  });
  socket.on("gameChange", data => {
    setGame(data);
  });

  function clickCell(l, c) {
    if (game.playerNow === nameMyUser) {
      socket.emit("pressCellRequest", { l, c });
    }
  }

  function handleModal() {
    setModalVisible(!modalVisible);
  }

  return (
    <Container>
      <Field refreshControl={<RefreshControl refreshing={refreshing} />}>
        {mineField.field &&
          mineField.field.map((l, indexL) => (
            <Line key={indexL}>
              {l.map((c, indexC) =>
                c === "-" ? (
                  <CellChoice
                    key={String(indexC)}
                    onPress={() => clickCell(indexL, indexC)}
                  />
                ) : c.match(/^\d/) ? (
                  <CellNumber key={String(indexC)}>
                    <CellNumberText color={colorNumber(c)}>{c}</CellNumberText>
                  </CellNumber>
                ) : c === "/" ? (
                  <CellEmpty key={String(indexC)} />
                ) : (
                  c.match(/x\d*/gi) && (
                    <CellBomb key={String(indexC)}>
                      <MaterialIcons
                        name='flag'
                        size={25}
                        color={colorNumber(
                          String(Number(c.replace("x", "")) + 1)
                        )}
                      />
                    </CellBomb>
                  )
                )
              )}
            </Line>
          ))}
      </Field>
      {game.playerNow === nameMyUser ? (
        <InfoTurn yourTime={true}>Sua Vez</InfoTurn>
      ) : (
        <InfoTurn>Vez de {game.playerNow}</InfoTurn>
      )}
      <BtnScore onPress={handleModal}>
        <BtnScoreText>Informações da partida</BtnScoreText>
      </BtnScore>
      <ModalScreen animationType='slide' visible={modalVisible}>
        <ModalView>
          <FlatList
            data={game.order}
            keyExtractor={player => player}
            renderItem={({ item }) => (
              <Player>
                <PlayerName>{item}</PlayerName>
                <PlayerPoints>{game.points[item]}</PlayerPoints>
              </Player>
            )}
          />

          <BackGameBtn onPress={handleModal}>
            <BackGameBtnText>Voltar para o jogo</BackGameBtnText>
          </BackGameBtn>
        </ModalView>
      </ModalScreen>
    </Container>
  );
}
