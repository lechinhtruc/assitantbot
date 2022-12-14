const schedule = require("node-schedule");
const fs = require("fs");
const send = require("../send");

function calculateAge(
  currentYear,
  currentDate,
  currentMonth,
  bornYear,
  bornDate,
  bornMonth
) {
  var age = {};
  var yearAge = currentYear - bornYear;
  var dateAge = 0;
  var monthAge = 0;
  if (currentMonth >= bornMonth) {
    monthAge = currentMonth - bornMonth;
  } else {
    yearAge--;
    monthAge = 12 + currentMonth - bornMonth;
  }
  if (currentDate >= bornDate) {
    dateAge = currentDate - bornDate;
  } else {
    monthAge--;
    dateAge = 31 + currentDate - bornDate;
    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }
  age = {
    years: yearAge,
    months: monthAge,
    days: dateAge,
  };
  return age;
}

function addSchedule(interaction, birthDataPath, birthQueue) {
  const userId = interaction.user?.id;
  const birthDay = interaction.options?.getNumber("day");
  const birthMonth = interaction.options?.getNumber("month");
  const birthYear = interaction.options?.getNumber("year");
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
    birthQueue[exits].age = calculateAge(
      year.getFullYear(),
      year.getDate(),
      year.getMonth(),
      born.getFullYear(),
      born.getDate(),
      born.getMonth()
    );
    schedule.cancelJob(userId);
  } else {
    birthQueue.push({
      id: userId.toString(userId),
      channelId: interaction.channelId,
      born: born,
      birth: date,
      age: calculateAge(
        year.getFullYear(),
        year.getDate(),
        year.getMonth(),
        born.getFullYear(),
        born.getDate(),
        born.getMonth()
      ),
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
        .send(`** ???????? CH??C M???NG SINH NH???T \`<@${item.id}>\` ???????? **`);
    });
  });
}

function scheduleBirth(id, date, interaction) {
  schedule.scheduleJob(id, date, function () {
    send(
      "sendAll",
      `** ???????? CH??C M???NG SINH NH???T \`<@${interaction.user.id}>\` ???????? **`,
      interaction
    );
  });
  send(
    "reply",
    `**<@${interaction.user.id}> c??i ?????t ng??y sinh nh???t th??nh c??ng!**`,
    interaction
  );
  console.log(date.toLocaleString("vi-VN"));
}

module.exports = { addSchedule, loadSchedule };
