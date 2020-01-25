const createMineField = require("../util/createMineField");

module.exports = {
  create(req, res) {
    const { numBomb, numLine, numColumn } = req.body;
    return res.json(createMineField(numBomb, numLine, numColumn));
  }
};
