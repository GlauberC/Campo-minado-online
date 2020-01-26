import { createAppContainer, createSwitchNavigator } from "react-navigation";
import EnterPage from "./pages/EnterPage";
import PlayerLobby from "./pages/PlayerLobby";
import FieldPage from "./pages/FieldPage";

export default createAppContainer(
  createSwitchNavigator({
    EnterPage,
    PlayerLobby,
    FieldPage
  })
);
