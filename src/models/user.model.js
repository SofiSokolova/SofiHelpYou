const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId, // ??
  telegramId: {
    type: Number,
    required: true,
    index: { unique: true }
  },
  list: {
    type: Array,
    default: []
  }
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.model('users', UserSchema)