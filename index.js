// eslint-disable-next-line no-undef
const config = require("dotenv").config();
const { SCENES } = require("./constants");
const { BUTTONS } = require("./constants");
const TelegramBot = require("telegraf");
const { list } = require("./src/controllers/list");
const { record } = require("./src/controllers/record");
const { findByTag } = require("./src/controllers/findByTag");
const Stage = require("telegraf/stage");
const session = require("telegraf/session");
const mongoose = require("mongoose");
const { Extra } = require("telegraf");
const kb = require("./keyboards");
const { chooseFindKeyboard } = require("./src/controllers/findByTag/helpers");
require("./mongoose.connect");

const token = config.parsed.TOKEN;
const db = mongoose.connection;

require("./src/models/user.model");
require("./src/models/diary.model");

db.on("open", () => {
  const bot = new TelegramBot(token, { polling: true });
  const stage = new Stage([list, record, findByTag]);

  stage.register(list);
  stage.register(record);
  stage.register(findByTag);

  bot.use(session());
  bot.use(stage.middleware());

  bot.command("start", ctx =>
    ctx.reply("How can I help you?", kb.menuKeyboard.open({ resize_keyboard: true }))
  );

  bot.hears(
    BUTTONS.CREATE_LIST,
    async ctx => await ctx.scene.enter(SCENES.LIST)
  );
  bot.hears(
    BUTTONS.NEW_RECORD,
    async ctx => await ctx.scene.enter(SCENES.RECORD)
  );
  bot.hears(
    BUTTONS.FIND,
    async ctx => await ctx.reply('Select search type', kb.findKeyboard.open({ resize_keyboard: true }))
  );
  bot.hears(
    BUTTONS.FIND_BY_TAG,
    async ctx => await ctx.scene.enter(SCENES.FIND_BY_TAG)
  );

  /*   bot.action(/New record/, ctx => ctx.scene.enter(SCENES.RECORD)) */
  bot.action(/Find/, ctx =>
    ctx.reply(" Choose a search type", Extra.markup(chooseFindKeyboard))
  );
  bot.action(/Find by tag/, ctx => ctx.scene.enter(SCENES.FIND));

  /*   bot.command("list", ctx => ctx.scene.enter(SCENES.LIST)); */
  /*   bot.command("find", ctx => ctx.scene.enter(SCENES.FIND)); */
  bot.launch();
});
/*
 *bot.onText(/1/, function (msg, match) {
 *var userId = msg.from.id;
 *var text = match[1];
 *var time = match[2];
 *
 *notes.push({ 'uid': userId, 'time': time, 'text': text });
 *
 *bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну :)');
 *});
 *
 *bot.on("polling_error", (err) => console.log(err));
 *
 *
 *
 *setInterval(function(){
 *for (var i = 0; i < notes.length; i++) {
 *  const curDate = new Date().getHours() + ':' + new Date().getMinutes();
 *  if (notes[i]['time'] === curDate) {
 *    bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
 *    notes.splice(i, 1);
 *  }
 *}
 *}, 1000); */
