
require('dotenv').config();
const TelegramBot = require('telegraf');
const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');
const VueMarkdown = require('vue-markdown-v2');
const fetch = require('node-fetch')
//const TelegrafInlineMenu = require('telegraf-inline-menu')

//const mongoose = require('mongoose');
const token =  process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});

/* connect(process.env.DB_URL, {
  useMongoClient: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err))
 */
//===============================================================================


const keyboard = Markup.inlineKeyboard([
  Markup.callbackButton('✅', 'edit'),
  Markup.callbackButton('❌', 'delete')
])

/* const vue = new Vue({
  components: {
    'vue-markdown': VueMarkdown
  }
})  */

bot.start((ctx) => ctx.reply('Hello'))
bot.help((ctx) => ctx.reply('Help message'))



  bot.on('message',  (ctx) => {
    
    let messageArray = ctx.message.text;
    console.log(`${messageArray}`);
    let arr = messageArray.split('\n');
    console.log(`${arr}`);
    for (let text of arr){
      console.log(`${text}`);
    ctx.telegram.sendMessage(ctx.chat.id, text, Extra.markup(keyboard))
}
} )



bot.action('edit',  params => {
  const { editMessageText } = params;
  const messageText = params.update.callback_query.message.text;
  editMessageText(strikeThrough(messageText), Extra.markdown().markup(keyboard))
} )

bot.action('delete', ({ deleteMessage }) => deleteMessage());
bot.launch()

function strikeThrough(text) {
  return text
    .split('')
    .map(char => char + '\u0336')
    .join('')
    
}
  /*  let arr = [];
  let msg = ctx.message.split([]);  */


/*   let arr = [];
  let firstCharIndex = null;
  for (let i = 0; i < messageArray.length; i++){
    if (messageArray[i] == ' '){
      if (firstCharIndex !== null){

      }
    }
  }
 */

/* let arr = [];
let list = 'Колбаса Хлеб Вода';
let firstCharIndex = null;
for(let i = 0; i < list.length; i++){
  if (list[i] == ' '){
    if (firstCharIndex !== null){
      let s = list.substr(firstCharIndex, i-1);
      arr.push(s);
      firstCharIndex = null;
    }
  } 
  else {
    if (firstCharIndex === null) {
      firstCharIndex = i;
    }
  }
}; */
/* var list = 'Колбаса Хлеб Вода';
console.log(typeof list.split(" ") + "\n" + list.split("  ")); */


  /* let re = /' '/g;
  let found = list.match(re); */


/* bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('Hi', async (ctx) => {
  let arr = [];
  await bot.hears("message")
  ctx.reply('Inline keyboard', Markup.inlineKeyboard([

    [
      Markup.callbackButton("✅", "done"),
      Markup.callbackButton("❌", "create")
  ]
    
  ]).extra());
});
bot.launch(); */

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

