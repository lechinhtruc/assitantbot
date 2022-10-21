const { player } = require("./play");
const send = require("../send");

function skip(interaction, queue) {
  player.stop();
  send(
    "reply",
    `⏭️ ${
      interaction.user !== undefined
        ? interaction.user.username
        : interaction.author.username
    } đã yêu cầu chuyển bài tiếp theo`,
    interaction
  );
}

module.exports = skip;
