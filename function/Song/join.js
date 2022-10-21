const { joinVoiceChannel } = require("@discordjs/voice");

function joinVoice(channelId, guildId, adapterCreator, player) {
  joinVoiceChannel({
    channelId: channelId,
    guildId: guildId,
    adapterCreator: adapterCreator,
  }).subscribe(player);
}

module.exports = joinVoice;
