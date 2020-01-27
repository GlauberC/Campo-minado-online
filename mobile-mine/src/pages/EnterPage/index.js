import React, { useState } from "react";

import io from "socket.io-client";

import {
  Container,
  NameContainer,
  Label,
  NameField,
  SubmitButton,
  SubmitButtonText,
  ErrMsg
} from "./styles";

export default function EnterPage({ navigation }) {
  const [name, setName] = useState("");
  const [errMsg, setErrMsg] = useState("");

  function handleSubmit() {
    // Pensar em alguma forma de evitar que players disconectados entrem juntos

    // Só zerar o socket quando voltar (lembrar qual é a função que faz isso do react navigation)
    setErrMsg("");
    let socket = io("http://177.89.36.87:3334", {
      query: {
        user_name: name
      }
    });
    socket.on("disconnect", () => {
      setErrMsg("Esse apelido já está em uso");
    });
    socket.on("connected", data => {
      navigation.navigate("PlayerLobby", {
        users: data,
        socket,
        nameMyUser: name
      });
    });
  }

  return (
    <Container>
      <NameContainer>
        <Label>Digite o seu apelido: </Label>
        <NameField value={name} onChangeText={setName} />
        <ErrMsg>{errMsg}</ErrMsg>
        <SubmitButton onPress={handleSubmit}>
          <SubmitButtonText>Entrar</SubmitButtonText>
        </SubmitButton>
      </NameContainer>
    </Container>
  );
}
