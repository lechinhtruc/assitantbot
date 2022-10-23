const { bold } = require("discord.js");

async function help(interaction) {
  await interaction.user.send(
    `
        ${bold("\n| TẤT CẢ LỆNH CỦA BOT |")}\n
        | /gif Trending : Lấy ra ảnh Gif đang trending từ ghiphy\n
        | /gif Random : Lấy ra ảnh Gif random\n
        | /info user : Hiện thông tin của bạn\n
        | /info user {tên người dùng} : Hiện thông tin của người dùng chỉ định\n
        | /info server : Hiện thông tin của máy chủ\n
        | /randombruh : Hiện ảnh random bruh bruh lmao :)))\n
        -----------------------------------------------\n
        | CHƠI NHẠC |\n
        | /play {url youtube} hoặc @play : Chơi bài nhạc bạn muốn chơi :))\n
        | /stop hoặc @stop : Dừng nhạc\n
        | /skip @skip: Chuyển bài nhạc tiếp theo\n
        | /skipto {vị trí trong hàng chờ} @skipto : Chuyển tới bài được chỉ định trong hàng chờ
        `
  );
  await interaction.reply(
    "Tất cả các lệnh của BOT đã gửi riêng cho bạn!\nKiểm tra tin nhắn riêng để biết thêm chi tiết!"
  );
}

module.exports = help;
