const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiarySchema = new Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        userId: {
            type: Number,
            required: true,
            index: { unique: true }
          },
        ref: 'users',
        index: { unique: true }
    },
    text:{
        type: String,
        required: true
    },
    photo:{
        type: Buffer
    },
    created: { 
        type: Date,
        default: Date.now
    },
    tag: {
        type: String,
        match: /(#\w+)/,
    }
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.model('diary', DiarySchema)