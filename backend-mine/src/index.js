const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");
const mineFieldController = require("./controllers/minefieldController");

const app = express();

const server = http.Server(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());

connectedUsers = {};
io.on("connection", socket => {
  const { user_name } = socket.handshake.query;

  if (!connectedUsers[user_name]) {
    connectedUsers[user_name] = {
      id: socket.id,
      name: user_name,
      ready: false
    };
    io.emit(
      "users",
      Object.keys(connectedUsers).map(user => connectedUsers[user])
    );
  } else {
    socket.disconnect(true);
  }

  socket.on("changeReady", data => {
    if (connectedUsers[data]) {
      connectedUsers[data].ready = !connectedUsers[data].ready;
      io.emit(
        "listenReady",
        Object.keys(connectedUsers).map(user => connectedUsers[user])
      );
    }
  });

  socket.on("disconnectPlayer", data => {
    if (connectedUsers[data]) {
      delete connectedUsers[user_name];
      io.emit(
        "listenReady",
        Object.keys(connectedUsers).map(user => connectedUsers[user])
      );
    }
  });

  socket.on("disconnect", () => {
    if (socket.id === connectedUsers[user_name].id) {
      delete connectedUsers[user_name];
    }
  });
});

app.post("/minefield", mineFieldController.create);

app.listen(3333);
server.listen(3334);
