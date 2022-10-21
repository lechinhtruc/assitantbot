const send = require("../send");
const { bold } = require("discord.js");

async function queue(interaction, songQueue) {
  if (songQueue.length > 0) {
    const queue = songQueue.map((song, index) => {
      return `\`${index + 1}. ${song.title}\`\n`;
    });
    send("reply", bold(queue.toString().replaceAll(",", "")), interaction);
  } else {
    send("reply", "🛑 Không có bài nhạc nào trong hàng chờ", interaction);
  }
}

module.exports = queue;
