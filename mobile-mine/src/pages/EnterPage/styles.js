import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const NameContainer = styled.View`
  background: #c3c3c3;
  width: 250px;
  height: 250px;
  padding: 20px;
  justify-content: center;
  elevation: 4;
`;
export const Label = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #111111;
  text-align: center;
  margin-bottom: 5px;
`;
export const NameField = styled.TextInput`
  color: #111111;
  border-color: #111111;
  border-width: 1px;
  margin: 10px 0;
  font-size: 16px;
  padding: 10px;
`;
export const SubmitButton = styled.TouchableOpacity`
  align-self: center;
  padding: 10px 30px;
  border-radius: 20px;
  elevation: 8;
  justify-content: center;
  align-items: center;
  background: #472f61;
  margin-top: 20px;
`;
export const SubmitButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
`;
export const ErrMsg = styled.Text`
  font-size: 14px;
  color: #d93939;
  margin-top: -8px;
  text-align: center;
`;
