import React from "react";
import Routes from "./src/routes";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["Unrecognized WebSocket", "Can't perform"]);

export default function App() {
  return <Routes />;
}
