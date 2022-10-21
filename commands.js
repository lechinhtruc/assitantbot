const { SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("info")
    .setDescription("Kiểm tra thông tin của người dùng hoặc máy chủ")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("user")
        .setDescription("Thông tin của người dùng")
        .addUserOption((option) =>
          option.setName("target").setDescription("Tên người dùng")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("server").setDescription("Thông tin máy chủ")
    ),
  new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Gửi ảnh gif ngẫu nhiên")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The gif category")
        .setRequired(true)
        .addChoices(
          { name: "Trending", value: "gif_trending" },
          { name: "Random", value: "gif_random" }
        )
    ),
  new SlashCommandBuilder()
    .setName("randombruh")
    .setDescription("Random shit image"),
  new SlashCommandBuilder()
    .setName("play")
    .setDescription("Bật nhạc bạn yêu thích ( Chỉ youtube )")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("Đường link youtube hoặc tên nhạc")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("skipto")
    .setDescription("Chuyển qua bài nhạc mà bạn mong muốn trong hàng chờ")
    .addNumberOption((option) =>
      option
        .setName("position")
        .setDescription("Vị trí của bài trong hàng chờ (Số thứ tự)")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Hiện các bài nhạc có trong hàng chờ"),
  new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Tạm dừng chơi nhạc"),
  new SlashCommandBuilder()
    .setName("unpause")
    .setDescription("Tiếp tục chơi nhạc"),
  new SlashCommandBuilder().setName("stop").setDescription("Dừng chơi nhạc"),
  new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Chuyển bài tiếp theo"),
  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Hiện tất cả các lệnh của Bot"),
  new SlashCommandBuilder()
    .setName("birthday")
    .setDescription(
      "Cài đặt ngày sinh nhật của bạn, lời chúc sẽ được gửi đến bạn vào ngày này"
    )
    .addNumberOption((option) => option.setName("day").setDescription("Ngày"))
    .addNumberOption((option) =>
      option.setName("month").setDescription("Tháng")
    )
    .addNumberOption((option) =>
      option.setName("year").setDescription("Năm sinh")
    ),
].map((command) => command.toJSON());

module.exports = commands;
