async function sendMessageToChannel(type, content, interaction) {
  try {
    if (type === "reply") {
      await interaction.reply({
        content: content,
      });
    }
    if (type === "sendAll") {
      await interaction.channel.send({
        content: content,
      });
    }
  } catch (err) {
    throw err;
  }
}

module.exports = sendMessageToChannel;
