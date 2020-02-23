const { Extra, Markup } = require("telegraf");
const { ReplyKeyboard } = require("telegram-keyboard-wrapper");

let setIdMsg = new Set();
const deleteListKeyboard = new ReplyKeyboard().addRow("Delete list");

function getListInlineKeyboard() {
  return Markup.inlineKeyboard([
    Markup.callbackButton("✅", "edit"),
    Markup.callbackButton("❌", "delete")
  ]);
}

/* function splitList(ctx) {
  let messageArray = ctx.message.text;
  let arr = messageArray.split("\n");
  for (let text of arr) {
    ctx.telegram.sendMessage(
      ctx.chat.id,
      text,
      Extra.markup(getListInlineKeyboard)
    );
  }
} */

function strikeThrough(text) {
  return text
    .split("")
    .map(char => char + "\u0336")
    .join("");
}

async function cleanListMessages(ctx) {
  let messageArray = ctx.message.text;
  let botMsg = ctx.message.message_id;
  if (messageArray === "Delete list") {
    for (let msgId of setIdMsg) {
      botMsg.message_id = msgId;
      await ctx.telegram.deleteMessage(ctx.chat.id, msgId);
    }
  }
}

async function getListMessages(ctx) {
  let messageArray = ctx.message.text;
  let arr = messageArray.split("\n");
  let botMsg;
  let k = 0;
  if (!(messageArray === "Delete list")) {
    for (let text of arr) {
      botMsg = await ctx.telegram.sendMessage(
        ctx.chat.id,
        text,
        Extra.markup(getListInlineKeyboard)
      );
      setIdMsg.add(botMsg.message_id);
      k++;
    }
  }
  if (k == arr.length) {
    ctx.telegram.sendMessage(
      ctx.chat.id,
      `Tap to button "Delete list" to delete all list `,
      deleteListKeyboard.open({ resize_keyboard: true })
    );
  }
}

async function deleteId(idMsg) {
  setIdMsg.delete(idMsg);
}

async function writeId(idMsg) {
  setIdMsg.add(idMsg);
}

module.exports = {
  writeId,
  deleteId,
  getListMessages,
  cleanListMessages,
  strikeThrough,
  /* splitList, */
  getListInlineKeyboard,
  deleteListKeyboard
};
