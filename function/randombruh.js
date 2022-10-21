const { AttachmentBuilder } = require("discord.js");
const send = require("./send");
const fs = require("fs");

async function randombruh(interaction) {
  const files = fs.readdirSync("./images/");
  const chosenFile = files[Math.floor(Math.random() * files.length)];
  const attachment = new AttachmentBuilder(`./images/${chosenFile}`);
  try {
    await interaction.reply({ files: [attachment] });
  } catch {
    send("reply", "Gửi ảnh random shit thất bại :< ", interaction);
    return false;
  }
}

module.exports = randombruh;
