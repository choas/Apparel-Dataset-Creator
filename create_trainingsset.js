"use strict";

const fs = require("fs");

// convert labels.json in a valid labels object
const labels = {};
let labelsJson = fs.readFileSync("./labels.json", "utf8").split("\n");
labelsJson.forEach((line) => {
  let kvs = line.split(":");
  if (kvs.length > 1) {
    labels[kvs[0]] = kvs[1].split("'")[1];
  }
});

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
