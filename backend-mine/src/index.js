const express = require("express");
const cors = require("cors");

const app = express();
const mineFieldController = require("./controllers/minefieldController");

app.use(cors());
app.use(express.json());

app.post("/minefield", mineFieldController.create);

app.listen(3333);
