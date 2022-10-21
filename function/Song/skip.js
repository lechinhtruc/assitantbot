const { player } = require("./play");
const send = require("../send");

function skip(interaction, queue) {
  player.stop();
  send(
    "reply",
    `⏭️ ${interaction.user.username} đã yêu cầu chuyển bài tiếp theo`,
    interaction
  );
}

module.exports = skip;
