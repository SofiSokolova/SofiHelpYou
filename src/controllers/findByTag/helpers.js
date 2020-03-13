const { ReplyKeyboard } = require("telegram-keyboard-wrapper");
const { BUTTONS } = require("../../../constants");
const { Markup } = require("telegraf");

/* const chooseFindKeyboard = new ReplyKeyboard().addRow(
  BUTTONS.TAG,
  BUTTONS.DATE
); */

function chooseFindKeyboard() {
    return Markup.inlineKeyboard([
      Markup.callbackButton(BUTTONS.TAG, "Find by tag"),
      Markup.callbackButton(BUTTONS.DATE, "Find by date")
    ]);
  }


async function chooseByTag(ctx) {

}

module.exports = {
  chooseFindKeyboard,
  chooseByTag,
};
