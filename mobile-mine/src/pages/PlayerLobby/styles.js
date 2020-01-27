import styled from "styled-components/native";

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
export const PlayersContainer = styled.View`
  background: #c3c3c3;
  width: 200px;
  min-height: 100px;
  elevation: 4;
  padding: 10px;
`;
export const Player = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const CloseBtn = styled.TouchableOpacity`
  flex-direction: row;
  background: #c3000a;
  margin-top: 50px;
  padding: 5px 15px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;
export const CloseBtnText = styled.Text`
  color: #fff;
  text-transform: uppercase;
  font-size: 12px;
`;
export const PlayerName = styled.Text`
  font-size: 18px;
`;
export const PlayerNumber = styled.Text`
  margin-top: 20px;
  color: #000;
  font-size: 22px;
`;
export const Box = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-color: #21301e;
  border-width: 1px;
`;
export const StartButton = styled(CloseBtn)`
  background: #21301e;
`;
export const StartButtonText = styled(CloseBtnText)``;

export const EmergencyBtn = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  align-self: flex-end;
  position: absolute;
  bottom: 0;
  right: 0;
`;
export const OnePlayerView = styled.View``;
export const SliderView = styled.View`
  margin-top: 30px;
  flex-direction: row;
`;
export const Slide = styled.Slider`
  width: 150px;
`;
export const SliderText = styled.Text`
  font-size: 16px;
`;

export const ErrMsg = styled.Text`
  font-size: 14px;
  color: #d93939;
  margin-top: 20px;
  text-align: center;
  width: 200px;
`;
