import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    type: {
        type: Object,
        required: true,
    },
    length: {
        type: Number,
        default: [],
    }
})

mongoose.model('list', ListSchema)