/* Song */
const { play } = require("./Song/play");
const send = require("./send");
const skip = require("./Song/skip");
const queue = require("./Song/queue");
const stop = require("./Song/stop");
const skipto = require("./Song/skipto");
const { pause, unpause } = require("./Song/pause");

/* Schedule */
const { addSchedule, loadSchedule } = require("./Schedule/birthday");

/* Help */
const help = require("./help");

/* Info */
const info = require("./info");

/* Random bruh */
const randombruh = require("./randombruh");

/* Gif */
const gif = require("./gif");

const purge = require("./purge");

const error = require("./error");

const { mute, unmute } = require("./mute");

module.exports = {
  play,
  send,
  skip,
  stop,
  mute,
  unmute,
  pause,
  unpause,
  queue,
  skipto,
  randombruh,
  addSchedule,
  loadSchedule,
  help,
  info,
  gif,
  purge,
  error,
};
