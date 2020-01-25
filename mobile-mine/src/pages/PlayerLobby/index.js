import React, { useState, useEffect, useMemo } from "react";
import { FlatList } from "react-native";

import {
  Container,
  PlayersContainer,
  Player,
  PlayerName,
  PlayerNumber
} from "./styles";

export default function PlayerLobby() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    function loadPlayer() {
      setPlayers([
        { id: "001", name: "Test1" },
        { id: "002", name: "Test2" },
        { id: "003", name: "Test3" },
        { id: "004", name: "Test4" }
      ]);
    }
    loadPlayer();
  }, []);

  const playerNumber = useMemo(() => players.length, [players]);

  return (
    <Container>
      <PlayersContainer>
        <FlatList
          data={players}
          keyExtractor={player => player.id}
          renderItem={({ item }) => (
            <Player>
              <PlayerName>{item.name}</PlayerName>
            </Player>
          )}
        />
      </PlayersContainer>
      <PlayerNumber>{playerNumber} players connected</PlayerNumber>
    </Container>
  );
}
