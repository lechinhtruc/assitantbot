const { bold } = require("discord.js");
const send = require("./send");
const birthQueue = require("../main");

function info(interaction) {
  if (interaction.options.getSubcommand() === "user") {
    const user = interaction.options.getUser("target");
    if (user) {
      const bornData = birthQueue.birthQueue.find(
        (birth) => birth.id === user?.id
      );
      const bornDate = new Date(bornData?.born);
      send(
        "reply",
        `${bold("| THÔNG TIN NGƯỜI DÙNG |")}\n🧑 Tên: ${user.username}\n🪪 ID: ${
          user.id
        }\n🕓 Ngày tạo: ${interaction.user.createdAt.toLocaleString(
          "vi-VN"
        )}\n🤡 Ngày gia nhập LMAO: ${interaction.member.joinedAt.toLocaleString(
          "vi-VN"
        )}\n🎂 Ngày sinh: ${bornDate.toLocaleDateString("vi-VN")}\n🔞 Tuổi: ${
          bornData?.age?.years
        } năm - ${bornData?.age?.months} tháng - ${bornData?.age?.days} ngày
        `,
        interaction
      );
    } else {
      const bornData = birthQueue.birthQueue.find(
        (birth) => birth.id === interaction.user?.id
      );
      const bornDate = new Date(bornData?.born);
      send(
        "reply",
        `${bold("| THÔNG TIN CỦA BẠN |")}\n🧑 Tên: ${
          interaction.user.username
        }\n🪪 ID: ${
          interaction.user.id
        }\n🕓 Ngày tạo: ${interaction.user.createdAt.toLocaleString(
          "vi-VN"
        )}\n🤡 Ngày gia nhập LMAO: ${interaction.member.joinedAt.toLocaleString(
          "vi-VN"
        )}\n🎂 Ngày sinh: ${bornDate.toLocaleDateString("vi-VN")}\n🔞 Tuổi: ${
          bornData?.age?.years
        } năm - ${bornData?.age?.months} tháng - ${bornData?.age?.days} ngày`,
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
