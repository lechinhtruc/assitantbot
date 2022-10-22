const send = require("../send");

async function mute(interaction) {
  const userId = interaction.options.getUser("user").id;
  const time = interaction.options.getNumber("minutes");
  const reason = interaction.options.getString("reason");
  const member = await interaction.guild.members.fetch(userId);

  if (
    interaction.member.roles.cache.some(
      (role) =>
        role.id === process.env.modRoleId || role.id === process.env.adminRoleId
    )
  ) {
    await member
      .timeout(time * 60 * 1000, reason)
      .then(() => {
        send(
          "reply",
          `⛔ <@${interaction.user.id}> khoá mõm <@${userId}> trong ${time} phút thành công!\n**Lý do: ${reason}**`,
          interaction
        );
      })
      .catch((err) => {
        send("reply", `**Tuổi pussy cat 😺**`, interaction);
      });
  } else {
    send("reply", `**Có quyền đâu mà rọ=)))**`, interaction);
  }
}

async function unmute(interaction) {
  const userId = interaction.options.getUser("user").id;
  const member = await interaction.guild.members.fetch(userId);
  await member
    .timeout(null)
    .then(() => {
      send(
        "reply",
        `⛔ <@${interaction.user.id}> mở rọ mõm <@${userId}>`,
        interaction
      );
    })
    .catch(() => {
      send("reply", `🛑 Tuổi pussy cat 😺`, interaction);
    });
}

module.exports = { mute, unmute };
