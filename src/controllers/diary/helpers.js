
const mongoose = require("mongoose");
require("../../models/diary.model");


const Diary = mongoose.model("diary");


async function recordToDiary(ctx) {
  let toDiary = await Diary.findOne({ userId: ctx.chat.id});
  console.log(toDiary)
  console.log(ctx.chat.id)
  if(toDiary){
    toDiary.text = ctx.message.text;
    toDiary.save()
  } else {
    toDiary = new Diary({
        
        userId:  ctx.chat.id,
        text: ctx.message.text
      });
      toDiary.save().then(() => console.log("new diary created"));
    }
    
  }




module.exports = {
    recordToDiary,
};
