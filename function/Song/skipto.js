const { playSong } = require("./play");
const send = require("../send");
const skip = require("./skip");

async function skipto(interaction, queue, position) {
  if (queue[position - 1] !== undefined && queue.length > 2) {
    queue.splice(0, position - 1);
    send("reply", `🎶 Chuyển tới bài **\`${queue[0].title}\`**`, interaction);
    playSong(queue[0].url, queue[0].title, interaction);
  } else if (queue[position - 1] !== undefined && queue.length <= 2) {
    skip(interaction);
  } else {
    send("reply", `🛑 Bài hát không tồn tại trong hàng chờ!`, interaction);
  }
}

module.exports = skipto;
