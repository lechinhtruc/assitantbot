const { createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");

const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const ytpl = require("ytpl");
const { youtubeVideoRegex, youtubePlaylistRegex } = require("../regex");
const { player } = require("./player");
const joinVoice = require("./join");
const send = require("../send");
const { bold } = require("discord.js");

function play(interaction, songQueue) {
  const url = interaction.options.getString("url");
  const channelId = interaction.member.voice.channel.id;
  const guildId = interaction.guild.id;
  const adapterCreator = interaction.guild.voiceAdapterCreator;
  if (songQueue.length <= 0) {
    interaction.deferReply({ ephemeral: true });
    getDetailVideo(url, songQueue, interaction).then(async () => {
      if (songQueue[0] !== undefined) {
        joinVoice(channelId, guildId, adapterCreator, player);
        playSong(songQueue[0].url, songQueue[0].title, interaction);
        interaction.editReply(`🎶 ${bold(`\`${songQueue[0].title}\``)}`);
      }
    });

    player.on(AudioPlayerStatus.Idle, async () => {
      songQueue.shift();
      if (songQueue.length > 0 && songQueue[0] !== undefined) {
        playSong(songQueue[0].url, songQueue[0].title, interaction);
      }
    });
  } else {
    getDetailVideo(url, songQueue).then(() => {
      send(
        "reply",
        `🎶 Thêm bài **\`${songQueue.slice(-1)[0].title}\`** vào hàng chờ.`,
        interaction
      );
    });
  }
}

function playSong(url, title, interaction) {
  if (url !== undefined) {
    getSongStream(url)
      .then(async (response) => {
        if (response) {
          await player.play(response);
          send("sendAll", `🎶 Lên nhạc: ${bold(`\`${title}\``)}`, interaction);
        }
      })
      .catch((err) => {
        throw err;
      });
  }
}

async function getDetailVideo(url, queue, interaction) {
  if (url.match(youtubePlaylistRegex)) {
    await ytpl(url, { pages: 1, gl: "VN", hl: "VI", limit: 25 })
      .then(async (response) => {
        response.items.map((item) => {
          queue.push({
            title: item.title,
            url: item.shortUrl,
          });
        });
        await send(
          "sendAll",
          `🎶 Thêm danh sách các bài nhạc gồm \`25 bài\` `,
          interaction
        );
        return true;
      })
      .catch(async (err) => {
        await send("reply", `🛑 Danh sách nhạc không hợp lệ! `, interaction);
        return;
      });
  } else if (url.match(youtubeVideoRegex)) {
    await ytdl
      .getInfo(url)
      .then(async (response) => {
        queue.push({
          title: response.videoDetails.title,
          url: response.videoDetails.video_url,
        });
        return true;
      })
      .catch((err) => {
        throw err;
      });
  } else {
    await ytsr(url, { pages: 1, gl: "VN", hl: "VI", limit: 5 })
      .then(async (response) => {
        queue.push({
          title: response.items[0].title,
          url: response.items[0].url,
        });
        return true;
      })
      .catch((err) => {
        throw err;
      });
  }
}

async function getSongStream(url) {
  let stream = createAudioResource(
    await ytdl(url, {
      filter: "audioonly",
      quality: "highestaudio",
      highWaterMark: 1024,
      dlChunkSize: 65536,
    })
  );
  return stream;
}

module.exports = { play, playSong, player };
