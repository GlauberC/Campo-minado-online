import styled from "styled-components/native";
import { lighten } from "polished";

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #e7e5e3;
  margin-top: 30px;
`;

export const Field = styled.ScrollView`
  border-width: 1px;
  border-color: #202327;
`;
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
