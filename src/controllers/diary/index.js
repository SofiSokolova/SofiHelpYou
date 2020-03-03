const Stage = require("telegraf").Stage;
const { SCENES } = require("../../../constants");
const WizardScene = require("telegraf/scenes/wizard");
const {
    recordToDiary
  } = require("./helpers");

const { leave } = Stage;
const diary = new WizardScene(
  SCENES.DIARY,
  ctx => {
    ctx.reply(
        `Write me what happened to you today. For example:\n "Today I'm SO happy #happy #theBestDayOfMyLife"\nAlso you can send me a photo.\nIn the future, you can find this message by tag`
    );
    return ctx.wizard.next();
  },
  async ctx => {
    recordToDiary(ctx);
    return ctx.wizard.next();
  },
  async ctx => {
   
    return ctx.scene.leave();
  }
);

diary.leave(ctx => {
  ctx.telegram.sendMessage(
    ctx.chat.id,
    `I will keep it in my memory for you`,
  );
});

diary.command("cancel", leave());

module.exports = {
  diary
};
