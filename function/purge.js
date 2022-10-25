const config = require("../main");

function purge(interaction, amount) {
  try {
    if (
      interaction.member.roles.cache.some(
        (role) =>
            role.id === config.config.modRoleId ||
          role.id === config.config.adminRoleId
      ) &&
      !isNaN(amount) &&
      amount <= 100
    ) {
      interaction.channel.bulkDelete(amount);
    } else {
      interaction.reply(
        `⛔ Không thể xoá tin nhắn vào lúc này!\n**Lưu ý : Xoá được tối đa 100 tin/lần**`
      );
    }
  } catch {
    return false;
  }
}

module.exports = purge;
