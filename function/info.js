const { bold } = require("discord.js");
const send = require("./send");

function info(interaction) {
  if (interaction.options.getSubcommand() === "user") {
    const user = interaction.options.getUser("target");
    if (user) {
      send(
        "reply",
        `${bold("| THÔNG TIN NGƯỜI DÙNG |")}\n 🧑 Tên: ${
          user.username
        }\n 🪪 ID: ${user.id}`,
        interaction
      );
    } else {
      send(
        "reply",
        `${bold("| THÔNG TIN CỦA BẠN |")}\n🧑 Tên: ${
          interaction.user.username
        }\n🪪 ID: ${interaction.user.id}`,
        interaction
      );
    }
  } else if (interaction.options.getSubcommand() === "server") {
    send(
      "reply",
      `${bold("| THÔNG TIN MÁY CHỦ |")}\n🤖 Tên máy chủ: ${
        interaction.guild.name
      }\n🤡 Thành viên: ${
        interaction.guild.memberCount
      }\n🎂 Ngày khởi tạo: ${interaction.guild.createdAt.toLocaleString(
        "vi-VN"
      )}`,
      interaction
    );
  }
}

module.exports = info;
