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
  PermissionsBitField,
  PermissionFlagsBits,
  ActivityType,
  ChannelFlagsBitField,
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildIntegrations,
    IntentsBitField.Flags.GuildMembers,

    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
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

const emojis = {
  pphavegun: { description: "FPS Player", role: process.env.fpsRoleId },
  nanithefuck: {
    description: "Hoyoverse Player",
    role: process.env.hoyoRoleId,
  },
  lmao: {
    description: "Blue Lmao",
    role: "700727015178895420",
  },
  girlclowd: {
    description: "Pinky Lmao",
    role: "691599233136066620",
  },
  fsmile: {
    description: "White Lmao",
    role: "687677259783602297",
  },
  cauvang: {
    description: "Yellow Lmao",
    role: "840275984854548500",
  },
};

function addReaction(message, reactions) {
  message.react(reactions[0]);
  reactions.shift();
  if (reactions.length > 0) {
    setTimeout(() => {
      addReaction(message, reactions);
    }, 750);
  }
}

function firstMessage(client, content, id, reactions = []) {
  const channel = client.channels.cache.get(id);
  channel.messages.fetch().then((mess) => {
    if (mess.size === 0) {
      channel.send(content).then((message) => {
        addReaction(message, reactions);
      });
    } else {
      const firstMess = mess.find(
        (element) => element.id === "1033662224377585694"
      );
      firstMess.edit(content);
      addReaction(firstMess, reactions);
    }
  });
}

client.once("ready", (client) => {
  const queue = fs.readFileSync(birthDataPath);
  birthQueue = JSON.parse(queue);
  botFunction.loadSchedule(birthQueue, client);
  client.user.setPresence({
    activities: [
      {
        name: process.env.defaultStatus,
        type: 1,
      },
    ],
    status: "idle",
  });
  /* client.channels.cache
    .get(process.env.channelId)
    .send(`${bold("🤖 Trợ lý đang hoạt động")}`); */
  /* const role = client.guilds.cache.get(process.env.guildId); */
  const reactionEmoji = (emojiName) =>
    client.emojis.cache.find((emoji) => emoji.name === emojiName);
  const reactions = [];
  let content = "";
  for (const key in emojis) {
    const emoji = reactionEmoji(key);
    reactions.push(emoji);
    const description = emojis[key].description;
    content += `${emoji} : ${description}\n`;
  }
  firstMessage(client, content, process.env.assignRoleChannelId, reactions);

  console.log("Ready!");
});

client.on("messageReactionAdd", (reaction, user) => {
  if (reaction.message.channelId === process.env.assignRoleChannelId) {
    if (user.id === "1031427178698637333") {
      return;
    }
    const emoji = reaction.emoji.name;
    const { guild } = reaction.message;
    const roleid = emojis[emoji].role;
    const role = guild.roles.cache.find((role) => role.id === roleid);
    const member = guild.members.cache.find((member) => member.id === user.id);
    member.roles.add(role);
  }
});

client.on("messageReactionRemove", (reaction, user) => {
  if (reaction.message.channelId === process.env.assignRoleChannelId) {
    if (user.id === "1031427178698637333") {
      return;
    }
    const emoji = reaction.emoji.name;
    const { guild } = reaction.message;
    const roleid = emojis[emoji].role;
    const role = guild.roles.cache.find((role) => role.id === roleid);
    const member = guild.members.cache.find((member) => member.id === user.id);
    member.roles.remove(role);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  /* console.log(interaction.member.roles.cache.some((role) => console.log(role.name + " " + role.id))); */
  /*   console.log(
    interaction.member.roles.cache.some(
      (role) => role.id === "929975094829281310"
    )
  ); */
  /* interaction.guild.roles.cache.forEach((role) =>
    console.log(role.name, role.id)
  ); */

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
    case "mute":
      botFunction.mute(interaction);
      break;
    case "unmute":
      botFunction.unmute(interaction);
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
      botFunction.addSchedule(interaction, birthDataPath, birthQueue);
      break;
    case "help":
      botFunction.help(interaction);
      break;
  }
});

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix)) return;

  /* message.guild.roles.forEach(role => console.log(role.name, role.id)) */
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
    case "purge":
      botFunction.purge(message, args[1]);
      break;
  }
});

client.on("guildMemberAdd", (member) => {
  member.send("Welcome to The LMAO Coffe 🍵");
  /*   member.roles.set([process.env.defaultRoleId]); */
});

client.login(process.env.DISCORD_TOKEN);

exports.songQueue = songQueue;
