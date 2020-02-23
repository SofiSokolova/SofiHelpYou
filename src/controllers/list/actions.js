const { strikeThrough, deleteId, getListInlineKeyboard } = require ("./helpers");
const  { Extra } = require ( "telegraf");

 const strikeAction = async ctx => {
  let { textMsg } = ctx;
  textMsg = ctx.update.callback_query.message.text;
  await ctx.editMessageText(
    strikeThrough(textMsg),
    Extra.markup(getListInlineKeyboard)
  );
};

 const deleteAction = async ctx => {
  let { del } = ctx;
  del = ctx.update.callback_query.message.message_id;
  deleteId(del);
  await ctx.telegram.deleteMessage(ctx.chat.id, del);
};

module.exports = {
  strikeAction,
  deleteAction

}