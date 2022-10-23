function purge(interaction, amount) {
  try {
    if (
      interaction.member.roles.cache.some(
        (role) =>
          role.id === process.env.modRoleId ||
          role.id === process.env.adminRoleId
      ) &&
      !isNaN(amount) &&
      amount <= 100
    ) {
      interaction.channel.bulkDelete(amount);
    } else {
      interaction.reply(`⛔ Không thể xoá tin nhắn vào lúc này!`);
    }
  } catch {
    return false;
  }
}

module.exports = purge;
