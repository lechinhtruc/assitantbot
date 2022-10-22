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
  const exits = birthQueue.findIndex((item) => item.id === userId);

  let date = new Date(year.getFullYear(), birthMonth - 1, birthDay, 0, 0, 0);
  if (date < year) {
    date = new Date(year.getFullYear() + 1, birthMonth - 1, birthDay, 0, 0, 0);
  }

  if (exits !== -1) {
    birthQueue[exits].born = born;
    birthQueue[exits].birth = date;
    birthQueue[exits].channelId = interaction.channelId;
    schedule.cancelJob(userId);
  } else {
    birthQueue.push({
      id: userId.toString(userId),
      channelId: interaction.channelId,
      born: born,
      birth: date,
    });
  }

  fs.writeFileSync(birthDataPath, JSON.stringify(birthQueue));
  scheduleBirth(userId, date, interaction);
}

function loadSchedule(birthQueue, client) {
  birthQueue.map((item) => {
    schedule.scheduleJob(item.id, item.date, function () {
      client.channels.cache
        .get(item.channelId)
        .send(`** 🎂🎂 CHÚC MỪNG SINH NHẬT \`<@${item.id}>\` 🎂🎂 **`);
    });
  });
}

function scheduleBirth(id, date, interaction) {
  schedule.scheduleJob(id, date, function () {
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

module.exports = { addSchedule, loadSchedule };
