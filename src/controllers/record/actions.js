const { recordToDiary } = require("./helpers");
const { Extra } = require("telegraf");
require("../../models/user.model");

const recordAction = async ctx => {
  await ctx.telegram.sendMessage(ctx.chat.id, `Write me what happened to you today. For example:\n "Today I'm SO happy #happy #theBestDayOfMyLife"\nAlso you can send me a photo.\nIn the future, you can find this message by tag`)
  ctx.telegram.sendMessage(
    ctx.chat.id,
    "Press the button and I'll delete your message from here, but I'll save it in my memory until you need it",
    deleteMessageKeyboard.open({ resize_keyboard: true })
  );
  /* recordToDiary(ctx); */

}

module.exports = {
  recordAction
};
