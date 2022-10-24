const fs = require("fs");
const filterPath = "./config/filter.json";
const filterData = fs.readFileSync(filterPath);

function filter(message, config) {
  const word = JSON.parse(filterData);
  for (let i = 0; i <= word.length; i++) {
    if (
      message.content.toLowerCase().includes(word[i]?.filter?.word) &&
      message.author.id !== config.botId
    ) {
      message.reply(word[i]?.filter?.reply).catch((err) => {
        return false;
      });
      return;
    }
  }
}

module.exports = filter;
