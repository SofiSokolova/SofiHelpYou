// eslint-disable-next-line no-undef
const config = require("dotenv").config();
const { SCENES } = require("./constants");
const TelegramBot = require("telegraf");
const { list } = require("./src/controllers/list");
const { diary } = require("./src/controllers/diary");
const Stage = require("telegraf/stage");
const session = require("telegraf/session");
const mongoose = require("mongoose");

const token = config.parsed.TOKEN;
mongoose
  .connect(process.env.DB_URL, {})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

require("./src/models/user.model");
require("./src/models/diary.model");

mongoose.connection.on("open", () => {
  const bot = new TelegramBot(token, { polling: true });
  const stage = new Stage([list]);

  stage.register(list);
  stage.register(diary);

  bot.use(session());
  bot.use(stage.middleware());
  bot.command("list", ctx => ctx.scene.enter(SCENES.LIST));
  bot.command("diary", ctx => ctx.scene.enter(SCENES.DIARY))
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
