const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");
const mineFieldController = require("./controllers/minefieldController");
const createMineField = require("./util/createMineField");

const app = express();

const server = http.Server(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());

let mineField = {};
let game = {};
let connectedUsers = {};

io.on("connection", socket => {
  const { user_name } = socket.handshake.query;

  if (!connectedUsers[user_name]) {
    connectedUsers[user_name] = {
      id: socket.id,
      name: user_name,
      ready: false
    };
    io.to(socket.id).emit(
      "connected",
      Object.keys(connectedUsers).map(user => connectedUsers[user])
    );
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
  socket.on("requestStartGame", data => {
    if (connectedUsers[data]) {
      const userNotReady = Object.keys(connectedUsers).find(
        user => !connectedUsers[user].ready
      );
      if (!userNotReady) {
        mineField = createMineField(20, 15, 8);
        game = {
          order: shuffle(Object.keys(connectedUsers)),
          turn: 0,
          points: {}
        };
        game.order.forEach(user => (game.points[user] = 0));
        game.playerNow = game.order[game.turn % game.order.length];
        console.log(game);
        io.emit("startGame", {
          start: true,
          game,
          mineField: {
            field: mineField.field,
            numBomb: mineField.numBomb,
            numLine: mineField.numLine,
            numColumn: mineField.numColumn
          }
        });
      }
    }
  });

  function pressCell(l, c, answer) {
    if (answer === "x") {
      mineField.field[l][c] = `x${game.turn % game.order.length}`;
      game.points[game.playerNow] = game.points[game.playerNow] + 1;
    } else {
      let value;
      mineField.field[l][c] = answer;

      if (answer === "/") {
        if (l > 0) {
          value = mineField.field[l - 1][c];
          value === "-" && pressCell(l - 1, c, mineField.fieldAnswer[l - 1][c]);
        }
        if (c > 0) {
          value = mineField.field[l][c - 1];
          value === "-" && pressCell(l, c - 1, mineField.fieldAnswer[l][c - 1]);
        }
        if (l > 0 && c > 0) {
          value = mineField.field[l - 1][c - 1];
          value === "-" &&
            pressCell(l - 1, c - 1, mineField.fieldAnswer[l - 1][c - 1]);
        }
        if (l < mineField.numLine - 1) {
          value = mineField.field[l + 1][c];
          value === "-" && pressCell(l + 1, c, mineField.fieldAnswer[l + 1][c]);
        }
        if (c < mineField.numColumn - 1) {
          value = mineField.field[l][c + 1];
          value === "-" && pressCell(l, c + 1, mineField.fieldAnswer[l][c + 1]);
        }
        if (c < mineField.numColumn - 1 && l < mineField.numLine - 1) {
          value = mineField.field[l + 1][c + 1];
          value === "-" &&
            pressCell(l + 1, c + 1, mineField.fieldAnswer[l + 1][c + 1]);
        }
        if (l > 0 && c < mineField.numColumn - 1) {
          value = mineField.field[l - 1][c + 1];
          value === "-" &&
            pressCell(l - 1, c + 1, mineField.fieldAnswer[l - 1][c + 1]);
        }
        if (l < mineField.numLine - 1 && c > 0) {
          value = mineField.field[l + 1][c - 1];
          value === "-" &&
            pressCell(l + 1, c - 1, mineField.fieldAnswer[l + 1][c - 1]);
        }
      }
    }
  }

  socket.on("pressCellRequest", async data => {
    let value = mineField.fieldAnswer[data.l][data.c];
    await pressCell(data.l, data.c, value);
    io.emit("getMineField", mineField);
    if (value !== "x") {
      game.turn = game.turn + 1;
      game.playerNow = game.order[game.turn % game.order.length];
    }
    io.emit("gameChange", game);
    console.log(game);
  });

  socket.on("disconnect", () => {
    if (socket.id === connectedUsers[user_name].id) {
      delete connectedUsers[user_name];
    }
  });
});

function shuffle(arra1) {
  let ctr = arra1.length,
    temp,
    index;
  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}

app.listen(3333);
server.listen(3334);
