import React, { useState, useEffect } from "react";
import { RefreshControl } from "react-native";
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
  CellNumberText
} from "./styles";

export default function FieldPage() {
  const [gameField, setGameField] = useState([]);
  const [field, setField] = useState({});

  useEffect(() => {
    async function loadField() {
      const response = await fetch("http://177.89.36.87:3333/minefield", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          numBomb: 30,
          numLine: 20,
          numColumn: 9
        })
      });
      const data = await response.json();
      setGameField(data.fieldEmpty);
      setField({
        answer: data.field,
        numLine: data.numLine,
        numColumn: data.numColumn,
        numBomb: data.numBomb
      });
    }
    loadField();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  function clickCell(l, c) {
    if (gameField[l][c] === "-") {
      let gameFieldCopy = gameField;
      const value = field.answer[l][c];
      if (value) {
        gameFieldCopy[l][c] = value;
        setGameField(gameFieldCopy);
        setRefreshing(true);
        setTimeout(() => {
          if (value === "/") {
            if (l > 0) {
              clickCell(l - 1, c);
            }
            if (c > 0) {
              clickCell(l, c - 1);
            }
            if (l > 0 && c > 0) {
              clickCell(l - 1, c - 1);
            }
            if (l < field.numLine - 1) {
              clickCell(l + 1, c);
            }
            if (c < field.numColumn - 1) {
              clickCell(l, c + 1);
            }
            if (c < field.numColumn - 1 && l < field.numLine - 1) {
              clickCell(l + 1, c + 1);
            }
            if (l > 0 && c < field.numColumn - 1) {
              clickCell(l - 1, c + 1);
            }
            if (l < field.numLine - 1 && c > 0) {
              clickCell(l + 1, c - 1);
            }
          }
          setRefreshing(false);
        }, 10);
      }
    }
  }

  return (
    <Container>
      <Field refreshControl={<RefreshControl refreshing={refreshing} />}>
        {gameField.map((l, indexL) => (
          <Line key={indexL}>
            {l.map((c, indexC) =>
              c === "-" ? (
                <CellChoice
                  key={String(indexC)}
                  onPress={() => clickCell(indexL, indexC)}
                />
              ) : c.match(/\d/) ? (
                <CellNumber key={String(indexC)}>
                  <CellNumberText color={colorNumber(c)}>{c}</CellNumberText>
                </CellNumber>
              ) : c === "/" ? (
                <CellEmpty key={String(indexC)} />
              ) : (
                c === "x" && (
                  <CellBomb key={String(indexC)}>
                    <MaterialIcons name='flag' size={25} color='#202327' />
                  </CellBomb>
                )
              )
            )}
          </Line>
        ))}
      </Field>
    </Container>
  );
}
