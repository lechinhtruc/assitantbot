const youtubeVideoRegex = new RegExp(
  /(?:youtube\.com\/(?:[^\\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\\/\s]{11})/
);

const youtubePlaylistRegex = new RegExp(/^.*(youtu.be\/|list=)([^#\&\?]*).*/);

module.exports = {
  youtubeVideoRegex,
  youtubePlaylistRegex,
};
