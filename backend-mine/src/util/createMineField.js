function generateZeroField(numLine, numColumn) {
  let field = [];
  for (let i = 0; i < numLine; i++) {
    field.push([]);
    for (let j = 0; j < numColumn; j++) {
      field[i][j] = 0;
    }
  }
  return field;
}
function generateEmptyField(numLine, numColumn) {
  let field = [];
  for (let i = 0; i < numLine; i++) {
    field.push([]);
    for (let j = 0; j < numColumn; j++) {
      field[i][j] = "-";
    }
  }
  return field;
}

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

function randomBombs(field, numBomb, numLine, numColumn) {
  let x, y;
  while (numBomb > 0) {
    x = randomNumber(numLine);
    y = randomNumber(numColumn);
    if (field[x][y] === 0) {
      field[x][y] = "x";
      numBomb--;
    }
  }
  return field;
}

function numberFill(field, numLine, numColumn) {
  let value;
  for (let i = 0; i < numLine; i++) {
    for (let j = 0; j < numColumn; j++) {
      if (field[i][j] === "x") {
        if (i > 0) {
          value = field[i - 1][j];
          field[i - 1][j] = value !== "x" ? value + 1 : "x";
        }
        if (j > 0) {
          value = field[i][j - 1];
          field[i][j - 1] = value !== "x" ? value + 1 : "x";
        }
        if (i > 0 && j > 0) {
          value = field[i - 1][j - 1];
          field[i - 1][j - 1] = value !== "x" ? value + 1 : "x";
        }
        if (i < numLine - 1) {
          value = field[i + 1][j];
          field[i + 1][j] = value !== "x" ? value + 1 : "x";
        }
        if (j < numColumn - 1) {
          value = field[i][j + 1];
          field[i][j + 1] = value !== "x" ? value + 1 : "x";
        }
        if (j < numColumn - 1 && i < numLine - 1) {
          value = field[i + 1][j + 1];
          field[i + 1][j + 1] = value !== "x" ? value + 1 : "x";
        }
        if (i > 0 && j < numColumn - 1) {
          value = field[i - 1][j + 1];
          field[i - 1][j + 1] = value !== "x" ? value + 1 : "x";
        }
        if (i < numLine - 1 && j > 0) {
          value = field[i + 1][j - 1];
          field[i + 1][j - 1] = value !== "x" ? value + 1 : "x";
        }
      }
    }
  }
  return field;
}

function fixField(field, numLine, numColumn) {
  for (let i = 0; i < numLine; i++) {
    for (let j = 0; j < numColumn; j++) {
      value = field[i][j];
      field[i][j] = value === 0 ? "/" : value !== "x" ? String(value) : "x";
    }
  }
  return field;
}

module.exports = (numBomb, numLine, numColumn) => {
  let field = generateZeroField(numLine, numColumn);

  const fieldEmpty = generateEmptyField(numLine, numColumn);

  field = randomBombs(field, numBomb, numLine, numColumn);
  field = numberFill(field, numLine, numColumn);
  field = fixField(field, numLine, numColumn);

  return { field, fieldEmpty, numBomb, numLine, numColumn };
};
