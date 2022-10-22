const dotenv = require("dotenv");
const fs = require("fs");
const botFunction = require("./function");

dotenv.config();

const {
  Client,
  REST,
  Routes,
  bold,
  IntentsBitField,
  GatewayIntentBits,
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildIntegrations,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

const commands = require("./commands");
const birthDataPath = "./data/birthData.json";
const prefix = process.env.prefix;

let songQueue = [];
let birthQueue = [];
/* let currentSongName = "";
let currentSong = 0; */

(async () => {
  try {
    console.log("Làm mới lại (/) các câu lệnh...");
    await rest.put(Routes.applicationCommands(process.env.clientId), {
      body: commands,
    });
    console.log("Làm mới lại (/) các câu lệnh thành công.");
  } catch (error) {
    console.error(error);
  }
})();

client.once("ready", (client) => {
  const queue = fs.readFileSync(birthDataPath);
  birthQueue = JSON.parse(queue);
  client.user.setPresence({
    activities: [
      {
        name: "Nhạc vàng",
        type: 1,
        url: "https://www.youtube.com/channel/UCWm8tWlw4VFfFchroVssxvg",
      },
    ],
    status: "idle",
  });
  client.channels.cache
    .get(process.env.channelId)
    .send(`${bold("🤖 Trợ lý đang hoạt động")}`);
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case "info":
      botFunction.info(interaction);
      break;
    case "gif":
      try {
        botFunction.gif(interaction);
      } catch {
        return;
      }
      break;
    case "randombruh":
      botFunction.randombruh(interaction);
      break;
    case "play":
      if (interaction.member.voice.channel) {
        botFunction.play(interaction);
      } else {
        botFunction.send(
          "reply",
          `🤡 Nhà mày ở đâu?Cho bố cái địa chỉ!`,
          interaction
        );
      }
      break;
    case "skip":
      botFunction.skip(interaction, songQueue);
      break;
    case "queue":
      botFunction.queue(interaction, songQueue);
      break;
    case "skipto":
      const position = interaction.options.getNumber("position");
      botFunction.skipto(interaction, songQueue, position);
      break;
    case "pause":
      botFunction.pause(interaction);
      break;
    case "unpause":
      botFunction.unpause(interaction);
      break;
    case "stop":
      botFunction.stop(interaction);
      break;
    case "birthday":
      botFunction.scheduleBirth(interaction, birthDataPath, birthQueue);
      break;
    case "help":
      botFunction.help(interaction);
      break;
  }
});

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.substring(prefix.length).split(" ");
  switch (args[0].toLocaleLowerCase()) {
    case "play":
      if (message.member.voice.channel) {
        botFunction.play(message);
      } else {
        botFunction.send(
          "reply",
          `🤡 Nhà mày ở đâu?Cho bố cái địa chỉ!`,
          message
        );
      }
      break;
    case "skip":
      botFunction.skip(message, songQueue);
      break;
    case "stop":
      botFunction.stop(message);
      break;
    case "pause":
      botFunction.pause(message);
      break;
    case "unpause":
      botFunction.unpause(message);
      break;
    case "skipto":
      const position = args[1];
      botFunction.skipto(message, songQueue, position);
      break;
    case "queue":
      botFunction.queue(message, songQueue);
      break;
  }
});

client.login(process.env.DISCORD_TOKEN);

exports.songQueue = songQueue;
/* console.log(process.env.DISCORD_TOKEN) */
