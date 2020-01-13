require('dotenv').config();
const TelegramBot = require('telegraf');
const mongoose = require('mongoose');


const token =  process.env.TOKEN;
console.log(token);
const bot = new TelegramBot(token, {polling: true});


const notes = [];
const state = {};

bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();



bot.command("create", (msg) => {

  bot.on(msg.chat.id, "Welcome", {
    "reply_markup": {
      "keyboard": [["Reminder", "Shopping list",  "A diary"]]
    }
  });

});


mongoose.connect('mongodb://localhost/mongoose_basics');

/*bot.onText(/1/, function (msg, match) {
  var userId = msg.from.id;
  var text = match[1];
  var time = match[2];

  notes.push({ 'uid': userId, 'time': time, 'text': text });

  bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну :)');
});

bot.on("polling_error", (err) => console.log(err));



setInterval(function(){
  for (var i = 0; i < notes.length; i++) {
    const curDate = new Date().getHours() + ':' + new Date().getMinutes();
    if (notes[i]['time'] === curDate) {
      bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
      notes.splice(i, 1);
    }
  }
}, 1000);
*/

/*bot.onText(/\/create/, (msg) => {
  let userId = msg.from.id;
  bot.sendMessage(userId, "Напиши список в формате: Сок\nХлеб\nСметана\n");
});*/

