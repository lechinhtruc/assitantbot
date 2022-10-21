const { player } = require("./play");
const send = require("../send");

function pause(interaction) {
  player.pause();
  send(
    "reply",
    `🛑 <@${
      interaction.user !== undefined
        ? interaction.user.id
        : interaction.author.id
    }> đã yêu cầu tạm dừng chơi nhạc.`,
    interaction
  );
}

function unpause(interaction) {
  player.unpause();
  send("reply", `🎶 Tiếp tục chơi nhạc.`, interaction);
}

module.exports = { pause, unpause };
