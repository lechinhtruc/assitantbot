const axios = require("axios");
const { bold } = require("discord.js");

function gif(interaction) {
  if (interaction.options.getString("category") === "gif_random") {
    getRandomGif().then(async (response) => {
      if (response !== false) {
        await interaction.reply(`${bold("Random GIF")}\n${response}`);
      } else {
        await interaction.reply("Failed to fetch data");
      }
    });
  }
  if (interaction.options.getString("category") === "gif_trending") {
    getTrendingGif().then(async (response) => {
      if (response !== false) {
        await interaction.reply(`${bold("Trending Gif")}\n${response}`);
      } else {
        await interaction.reply("Failed to fetch data");
      }
    });
  }
}

async function getRandomGif() {
  return await axios
    .get(
      "https://api.giphy.com/v1/gifs/random?api_key=HlE0boFF02S9Xe6QP7z21hr61F5VpMdF&tag=&rating=g"
    )
    .then(function (response) {
      // handle success
      if (response.status == 200) {
        /* console.log(response.data.data.url); */
        return response.data.data.embed_url;
      } else {
        return false;
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return false;
    });
}

async function getTrendingGif() {
  return await axios
    .get(
      "https://api.giphy.com/v1/gifs/trending?api_key=HlE0boFF02S9Xe6QP7z21hr61F5VpMdF&limit=1&rating=g"
    )
    .then(function (response) {
      // handle success
      if (response.status == 200) {
        /* console.log(response.data.data.url); */
        return response.data.data[0].embed_url;
      } else {
        return false;
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return false;
    });
}

module.exports = gif;
