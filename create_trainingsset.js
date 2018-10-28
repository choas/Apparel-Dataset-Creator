"use strict";

const fs = require("fs");

// convert labels.json in a valid labels object
const labels = {};
let labelsJson = fs.readFileSync("./labels.json", "utf8").split("\n");
labelsJson.forEach((line) => {
  let kvs = line.split(":");
  if (kvs.length > 1) {
    let val = kvs[1].split("'")[1].toLowerCase().replace(/,/gi, "_").replace(/ /gi, "_");
    labels[kvs[0]] = val;
  }
});

const PATH = "fashion_data";
const TRAIN_PATH = "training";
const TEST_PATH = "test";
const VALID_PATH = "validation";

_mkdir(PATH);
_mkdir(PATH + "/" + TRAIN_PATH);
_mkdir(PATH + "/" + TEST_PATH);
_mkdir(PATH + "/" + VALID_PATH);


Object.values(labels).forEach((label) => {
  _mkdir(PATH + "/" + TRAIN_PATH + "/" + label);
  _mkdir(PATH + "/" + TEST_PATH + "/" + label);
  _mkdir(PATH + "/" + VALID_PATH + "/" + label);
});

let train = fs.readFileSync("./train.txt", "utf8").split("\n");
_copyFiles(train, TRAIN_PATH);

let test = fs.readFileSync("./test.txt", "utf8").split("\n");
_copyFiles(test, TEST_PATH, VALID_PATH);

function _mkdir(path) {
  try {
    fs.mkdirSync(path);
  } catch (e) {
    if (e.code !== "EEXIST") {
      throw e;
    }
  }
}

function _copyFiles(filelist, target, target2) {
  var useTarget2 = false;
  filelist.forEach((file) => {

    if (file && file.length > 0) {
      let source = file + ".jpg";
      let ss = source.split("/");
      let label = labels[ss[0]];

      if (label && label.length > 0) {
        var t = target;
        if (useTarget2) {
          t = target2;
        }
        if (target2) {
          useTarget2 = !useTarget2;
        }
        let dest = PATH + "/" + t + "/" + label + "/" + ss[ss.length - 1];
        fs.copyFile("images/" + source, dest, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  });
}
