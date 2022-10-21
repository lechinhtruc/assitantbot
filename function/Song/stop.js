const { getVoiceConnection } = require("@discordjs/voice");
const send = require("../send");

function stop(interaction) {
  getVoiceConnection(interaction.guild.id).destroy();
  send(
    "reply",
    `⏹️ ${interaction.user.username} đã yêu cầu dừng chơi nhạc :(`,
    interaction
  );
  return;
}

module.exports = stop;
