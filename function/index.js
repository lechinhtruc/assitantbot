/* Song */
const { play } = require("./Song/play");
const send = require("./send");
const skip = require("./Song/skip");
const queue = require("./Song/queue");
const stop = require("./Song/stop");
const skipto = require("./Song/skipto");
const { pause, unpause } = require("./Song/pause");

/* Schedule */
const scheduleBirth = require("./Schedule/birthday");

/* Help */
const help = require("./help");

/* Info */
const info = require("./info");

/* Random bruh */
const randombruh = require("./randombruh");

/* Gif */
const gif = require("./gif");

module.exports = {
  play,
  send,
  skip,
  stop,
  pause,
  unpause,
  queue,
  skipto,
  randombruh,
  scheduleBirth,
  help,
  info,
  gif,
};
