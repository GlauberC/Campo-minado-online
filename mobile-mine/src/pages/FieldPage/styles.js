import styled from "styled-components/native";
import { lighten } from "polished";

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #e7e5e3;
  margin-top: 30px;
`;

export const Field = styled.ScrollView``;
export const Line = styled.View`
  flex-direction: row;
`;
export const CellChoice = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  background: #2f4bcf;
  margin: 2px;
  elevation: 1;
`;
export const CellEmpty = styled.View`
  width: 30px;
  height: 30px;
  margin: 2px;
  justify-content: center;
  align-items: center;
  elevation: 1;
  background: ${lighten(0.4, "#2f4bcf")};
`;
export const CellNumber = styled(CellEmpty)`
  justify-content: center;
  align-items: center;
  background: ${lighten(0.35, "#2f4bcf")};
`;
export const CellNumberText = styled.Text`
  font-size: 25px;
  color: ${props => props.color};
`;
export const CellBomb = styled(CellNumber)`
  background: ${lighten(0.4, "#2f4bcf")};
  border-color: #202327;
  border-width: 1px;
`;

export const InfoTurn = styled.Text`
  font-size: 16px;
  margin-bottom: 20px;
  color: ${props => (props.yourTime ? "#C3000A" : "#000000")};
`;
export const BtnScore = styled.TouchableOpacity`
  padding: 10px 30px;
  border-radius: 10px;
  elevation: 4;
  background: #cba602;
  margin-bottom: 10px;
`;
export const BtnScoreText = styled.Text`
  font-size: 16px;
`;

export const ModalScreen = styled.Modal``;
export const ModalView = styled.View`
  background: #e7e5e3;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export const BackGameBtn = styled(BtnScore)``;
export const BackGameBtnText = styled(BtnScoreText)``;

export const Player = styled.View`
  margin-top: 50px;
  width: 200px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0px;
`;
export const PlayerName = styled.Text`
  font-size: 16px;
`;
export const PlayerPoints = styled.Text`
  font-size: 16px;
`;
