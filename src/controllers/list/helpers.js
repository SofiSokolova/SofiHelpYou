const { Extra, Markup } = require("telegraf");
const { ReplyKeyboard } = require("telegram-keyboard-wrapper");
const { BUTTONS } = require("../../../constants");
const mongoose = require("mongoose");
require("../../models/user.model");


const User = mongoose.model("users");
const deleteListKeyboard = new ReplyKeyboard().addRow("Delete list");

function getListInlineKeyboard() {
  return Markup.inlineKeyboard([
    Markup.callbackButton("✅", "edit"),
    Markup.callbackButton("❌", "delete")
  ]);
}

function strikeThrough(text) {
  return text
    .split("")
    .map(char => char + "\u0336")
    .join("");
}

async function cleanListMessages(ctx) {
  let IUser = await User.findOne({ telegramId: ctx.chat.id });
  if (ctx.message.text === BUTTONS.DELETE_LIST) {
    await Promise.all(
      IUser.list.map(async item => {
        ctx.message.message_id = item;
        await ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
        IUser.list = [];
      })
    );
    IUser.save();
  }
}

async function deleteUserList(chatId, msgId) {
  let IUser = await User.findOne({ telegramId: chatId });
  if (IUser) {
    if (IUser.list.length !== 0) {
      let index = IUser.list.indexOf(msgId);
      if (index > -1) {
        IUser.list.splice(index, 1);
        IUser.save();
      }
    }
  }
}

async function addUserList(chatId, msgId) {
  let IUser = await User.findOne({ telegramId: chatId });
  if (IUser) {
    IUser.list.push(msgId);
    IUser.save().then(() => console.log("list update"));
  } else {
    IUser = new User({
      telegramId: chatId,
      list: []
    });
    IUser.list.push(msgId);
    IUser.save().then(() => console.log("dratuti"));
  }
  return IUser;
}

async function getListMessages(ctx) {
  let arr = ctx.message.text.split("\n");
  if (!(ctx.message.text === BUTTONS.DELETE_LIST)) {
    await Promise.all(
      arr.map(async msg => {
        let botMsg = await ctx.telegram.sendMessage(
          ctx.chat.id,
          msg,
          Extra.markup(getListInlineKeyboard)
        );
        addUserList(ctx.chat.id, botMsg.message_id);
      })
    );
  }
  await ctx.telegram.sendMessage(
    ctx.chat.id,
    `Tap to button "Delete list" to delete all list `,
    deleteListKeyboard.open({ resize_keyboard: true })
  );
}

module.exports = {
  getListMessages,
  cleanListMessages,
  strikeThrough,
  getListInlineKeyboard,
  deleteListKeyboard,
  deleteUserList
};
