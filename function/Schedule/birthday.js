const schedule = require("node-schedule");
const fs = require("fs");
const send = require("../send");

function addSchedule(interaction, birthDataPath, birthQueue) {
  const userId = interaction.user.id;
  const birthDay = interaction.options.getNumber("day");
  const birthMonth = interaction.options.getNumber("month");
  const birthYear = interaction.options.getNumber("year");
  const year = new Date();
  const born = new Date(birthYear, birthMonth - 1, birthDay, 0, 0, 0);
  const date = new Date(year.getFullYear(), birthMonth - 1, birthDay, 0, 0, 0);
  birthQueue.push({
    id: userId,
    born: born,
    birth: date,
  });
  fs.writeFileSync(birthDataPath, JSON.stringify(birthQueue));
  scheduleBirth(date, interaction);
}

function scheduleBirth(date, interaction) {
  schedule.scheduleJob(date, function () {
    send(
      "sendAll",
      `** 🎂🎂 CHÚC MỪNG SINH NHẬT \`<@${interaction.user.id}>\` 🎂🎂 **`,
      interaction
    );
  });
  send(
    "reply",
    `**<@${interaction.user.id}> cài đặt ngày sinh nhật thành công!**`,
    interaction
  );
  console.log(date.toLocaleString("vi-VN"));
}

module.exports = addSchedule;
