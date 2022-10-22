const { createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");

const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const ytpl = require("ytpl");
const { youtubeVideoRegex, youtubePlaylistRegex } = require("../regex");
const { player } = require("./player");
const joinVoice = require("./join");
const send = require("../send");
const { bold } = require("discord.js");

let queue = require("../../main");
let ownerinteraction;



player.on("stateChange", async (oldState, newState) => {
  if (
    newState.status === AudioPlayerStatus.Idle &&
    oldState.status !== AudioPlayerStatus.Idle
  ) {
    queue.songQueue.shift();
    console.log(queue.songQueue);
    if (queue.songQueue.length > 0 && queue.songQueue[0] !== undefined) {
      playSong(
        queue.songQueue[0].url,
        queue.songQueue[0].title,
        ownerinteraction
      );
    }
  }
});

function play(interaction) {
  const url =
    interaction.options !== undefined
      ? interaction.options.getString("url")
      : interaction.content.substring(interaction.content.indexOf(" "));
  const channelId = interaction.member.voice.channel.id;
  const guildId = interaction.guild.id;
  const adapterCreator = interaction.guild.voiceAdapterCreator;
  ownerinteraction = interaction;
  if (queue.songQueue.length === 0) {
    getDetailVideo(url, queue.songQueue, interaction).then(async () => {
      if (queue.songQueue[0] !== undefined) {
        joinVoice(channelId, guildId, adapterCreator, player);
        playSong(queue.songQueue[0].url, queue.songQueue[0].title, interaction);
        interaction.reply({
          content: `🎶 ${bold(`\`${queue.songQueue[0].title}\``)}`,
        });
      }
    });
  } else {
    getDetailVideo(url, queue.songQueue).then(() => {
      send(
        "reply",
        `🎶 Thêm bài **\`${
          queue.songQueue.slice(-1)[0].title
        }\`** vào hàng chờ.`,
        interaction
      );
    });
  }
}

function playSong(url, title, interaction) {
  if (url !== undefined) {
    getSongStream(url)
      .then((response) => {
        if (response) {
          setTimeout(() => player.play(response), 100);
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
        const queueNow = queue.map((song, index) => {
          return `\`${index + 1}. ${song.title}\`\n`;
        });
        send(
          "sendAll",
          `🎶 Thêm danh sách các bài nhạc gồm \`${
            response.estimatedItemCount
          } bài\`\n${bold(queueNow.toString().replaceAll(",", ""))}`,
          ownerinteraction
        );
        return;
      })
      .catch(async (err) => {
        send("reply", `🛑 Danh sách nhạc không hợp lệ! `, ownerinteraction);
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
      .catch(async (err) => {
        await send("reply", `⛔ Nhạc không tồn tại.`, interaction);
        return;
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
