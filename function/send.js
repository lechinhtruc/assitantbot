async function sendMessageToChannel(type, content, interaction) {
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
}

module.exports = sendMessageToChannel;
