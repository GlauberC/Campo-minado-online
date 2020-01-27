import React, { useState, useEffect } from "react";
import { RefreshControl, Text, FlatList } from "react-native";
import colorNumber from "../../util/colorNumber";

import { MaterialIcons } from "@expo/vector-icons";

import {
  Container,
  Header,
  PlayersScoreView,
  InfoLabel,
  Label,
  Field,
  Line,
  CellChoice,
  CellEmpty,
  CellNumber,
  CellBomb,
  CellNumberText,
  ModalScreen,
  ModalView,
  Player,
  PlayerName,
  PlayerPoints,
  InfoTurn,
  WinnerMsg,
  PlayerWinner,
  PointsWinner,
  QuitGameBtn,
  QuitGameBtnText
} from "./styles";

export default function FieldPage({ navigation }) {
  const [mineField, setMineField] = useState({});
  const [players, setPlayers] = useState({});
  const [game, setGame] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [winner, setWinner] = useState([]);
  const [pointsWinner, setPointsWinner] = useState(0);

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
  socket.on("gameEnd", data => {
    setWinner(data.winner);
    setPointsWinner(data.pointsWinner);
    setModalVisible(true);
  });

  function clickCell(l, c) {
    if (game.playerNow === nameMyUser) {
      socket.emit("pressCellRequest", { l, c });
    }
  }
  function handleQuit() {
    socket.emit("quitGame", nameMyUser);
    navigation.navigate("EnterPage");
  }

  return (
    <Container>
      <Header>
        <PlayersScoreView>
          {game.order &&
            game.order.map((player, index) => (
              <InfoLabel key={player} color={colorNumber(String(index + 1))}>
                <Label color={colorNumber(String(index + 1))}>
                  {player.slice(0, 3)} {game.points[player]}
                </Label>
                <MaterialIcons
                  name='flag'
                  size={16}
                  color={colorNumber(String(index + 1))}
                />
              </InfoLabel>
            ))}
        </PlayersScoreView>
        <InfoLabel>
          <MaterialIcons name='brightness-high' size={16} color='#111' />
          <Label>{game.bombsLeft}</Label>
        </InfoLabel>
      </Header>
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
      <QuitGameBtn onPress={handleQuit}>
        <QuitGameBtnText>Sair da partida</QuitGameBtnText>
      </QuitGameBtn>

      <ModalScreen animationType='slide' visible={modalVisible}>
        <ModalView>
          {winner.length > 0 && (
            <>
              <WinnerMsg>
                {winner.map(player => (
                  <PlayerWinner key={player}>{`${player} `}</PlayerWinner>
                ))}
                {winner.length > 1
                  ? " foram os vencedores "
                  : " foi o vencedor "}
                com <PointsWinner>{pointsWinner}</PointsWinner> pontos
              </WinnerMsg>
              <WinnerMsg>Placar</WinnerMsg>
            </>
          )}
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
          <QuitGameBtn onPress={handleQuit}>
            <QuitGameBtnText>Sair da partida</QuitGameBtnText>
          </QuitGameBtn>
        </ModalView>
      </ModalScreen>
    </Container>
  );
}
