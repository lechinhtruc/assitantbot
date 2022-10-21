const { createAudioPlayer, NoSubscriberBehavior } = require("@discordjs/voice");

const player = createAudioPlayer({
  behaviors: {
    maxMissedFrames: 100,
    noSubscriber: NoSubscriberBehavior.Pause,
  },
});

module.exports = {
  player,
};
