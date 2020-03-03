const {
  strikeThrough,
  getListInlineKeyboard,
  deleteUserList
} = require("./helpers");
const { Extra } = require("telegraf");
require("../../models/user.model");



const strikeAction = async ctx => {
  let { textMsg } = ctx;
  textMsg = ctx.update.callback_query.message.text;
  await ctx.editMessageText(
    strikeThrough(textMsg),
    Extra.markup(getListInlineKeyboard)
  );
};

const deleteAction = async ctx => {
  let chatId = ctx.chat.id;
  let { del } = ctx;
  del = ctx.update.callback_query.message.message_id;
  deleteUserList(chatId, del);
  await ctx.telegram.deleteMessage(ctx.chat.id, del);
};

module.exports = {
  strikeAction,
  deleteAction
};
