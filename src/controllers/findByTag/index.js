const Stage = require("telegraf").Stage;
const { SCENES } = require("../../../constants");
const WizardScene = require("telegraf/scenes/wizard");
const { leave } = Stage;
const kb = require("../../../keyboards");
const findByTag = new WizardScene(
  SCENES.FIND_BY_TAG,
  async ctx => {
    ctx.reply(
      ``)
    return ctx.wizard.next();
  },

  async ctx => {
    return ctx.scene.leave();
  }
);

findByTag.leave(ctx => {
  ctx.telegram.sendMessage(ctx.chat.id, `I'll wait for you`, kb.open({ resize_keyboard: true }));
});

findByTag.command("cancel", leave());

module.exports = {
  findByTag
};
