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

  if (interaction.commandName === "info") {
    botFunction.info(interaction);
  }

  if (interaction.commandName === "gif") {
    try {
      botFunction.gif(interaction);
    } catch {
      return;
    }
  }

  if (interaction.commandName === "randombruh") {
    botFunction.randombruh(interaction);
  }

  if (interaction.commandName === "play") {
    try {
      if (interaction.member.voice.channel) {
        botFunction.play(interaction, songQueue);
      } else {
        botFunction.send(
          "reply",
          `🤡 Nhà mày ở đâu?Cho bố cái địa chỉ!`,
          interaction
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (interaction.commandName === "skip") {
    botFunction.skip(interaction, songQueue);
  }

  if (interaction.commandName === "queue") {
    botFunction.queue(interaction, songQueue);
  }

  if (interaction.commandName === "skipto") {
    const position = interaction.options.getNumber("position");
    botFunction.skipto(interaction, songQueue, position);
  }

  if (interaction.commandName === "pause") {
    botFunction.pause(interaction);
  }

  if (interaction.commandName === "unpause") {
    botFunction.unpause(interaction);
  }

  if (interaction.commandName === "stop") {
    try {
      songQueue = [];
      botFunction.stop(interaction);
    } catch {
      return false;
    }
  }

  if (interaction.commandName === "birthday") {
    botFunction.scheduleBirth(interaction, birthDataPath, birthQueue);
  }

  if (interaction.commandName === "help") {
    botFunction.help(interaction);
  }
});

client.on("messageCreate", (message) => {});

client.login(process.env.DISCORD_TOKEN);

/* console.log(process.env.DISCORD_TOKEN) */
