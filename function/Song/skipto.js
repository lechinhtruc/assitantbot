const { playSong } = require("./play");
const send = require("../send");
const skip = require("./skip");

async function skipto(interaction, queue, position) {
  if (queue[position - 1] !== undefined) {
    /*     queue.splice(0, position - 1); */
    send(
      "reply",
      `🎶 Chuyển tới bài **\`${queue[position - 1].title}\`**`,
      interaction
    );
    playSong(queue[position - 1].url, queue[position - 1].title, interaction);
    /*   } else if (queue[position - 1] !== undefined && queue.length <= 2) {
    playSong(queue[position - 1].url, queue[position - 1].title, interaction);
  } */
  } else {
    send("reply", `🛑 Bài hát không tồn tại trong hàng chờ!`, interaction);
  }
}

module.exports = skipto;
