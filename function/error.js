const { AttachmentBuilder } = require("discord.js");
const send = require("./send");

async function error(interaction) {
  const attachment = new AttachmentBuilder(`./images/error/fatmom.png`);
  try {
    await interaction.reply({ files: [attachment], content:'Đang bận' });
  } catch {
    /* send("reply", "Gửi ảnh random shit thất bại :< ", interaction); */
    return false;
  }
}

module.exports = error;
