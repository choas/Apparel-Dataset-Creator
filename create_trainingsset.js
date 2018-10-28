"use strict";

const fs = require("fs");

const labels = {
  "0": "blouses",
  "1": "cloak",
  "2": "coat",
  "3": "jacket",
  "4": "long dress",
  "5": "polo shirt, sport shirt",
  "6": "robe",
  "7": "shirt",
  "8": "short dress",
  "9": "suit, suit of clothes",
  "10": "sweater",
  "11": "jersey, T-shirt, tee shirt",
  "12": "undergarment, upper body",
  "13": "uniform",
  "14": "vest, waistcoat"
};

const PATH = "fashion_data";
const TRAIN_PATH = "training";
const TEST_PATH = "test";

_mkdir(PATH);
_mkdir(PATH + "/" + TRAIN_PATH);
_mkdir(PATH + "/" + TEST_PATH);

Object.values(labels).forEach((label) => {
  _mkdir(PATH + "/" + TRAIN_PATH + "/" + label);
  _mkdir(PATH + "/" + TEST_PATH + "/" + label);
});

let train = fs.readFileSync("./train.txt", "utf8").split("\n");
_copyFiles(train, TRAIN_PATH);

let test = fs.readFileSync("./test.txt", "utf8").split("\n");
_copyFiles(test, TEST_PATH);

function _mkdir(path) {
  try {
    fs.mkdirSync(path);
  } catch (e) {
    if (e.code !== "EEXIST") {
      throw e;
    }
  }
}

function _copyFiles(filelist, target) {
  filelist.forEach((file) => {

    if (file && file.length > 0) {
      let source = file + ".jpg";
      let ss = source.split("/");
      let label = labels[ss[0]];

      if (label && label.length > 0) {
        let dest = PATH + "/" + target + "/" + label + "/" + ss[ss.length - 1];
        fs.copyFile("images/" + source, dest, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  });
}
