const { getVoiceConnection } = require("@discordjs/voice");
const send = require("../send");
const { player } = require("./play");

let queue = require("../../main");

function stop(interaction) {
  if (getVoiceConnection(interaction.guild.id)) {
    queue.songQueue.splice(0, queue.songQueue.length);
    getVoiceConnection(interaction.guild.id).destroy();
    send(
      "reply",
      `⏹️ ${
        interaction.user !== undefined
          ? interaction.user.username
          : interaction.author.username
      } đã yêu cầu dừng chơi nhạc :(`,
      interaction
    );
    interaction.client.user.setPresence({
      activities: [
        {
          name: process.env.defaultStatus,
          type: 1,
        },
      ],
    });
  } else {
    send("reply", `**🛑 Có chơi nhạc đâu mà dừng ?? 🤡 ??**`, interaction);
  }
}

module.exports = stop;
