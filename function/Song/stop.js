const { getVoiceConnection } = require("@discordjs/voice");
const send = require("../send");

function stop(interaction) {
  if (getVoiceConnection(interaction.guild.id)) {
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
  } else {
    send("reply", `🛑 Có chơi nhạc đâu mà dừng ?? 🤡 ??`, interaction);
  }
}

module.exports = stop;
