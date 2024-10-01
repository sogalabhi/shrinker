const mongoose = require('mongoose');

const { Schema } = mongoose;
const LinkSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    original: {
        type: String,
        required: true
    },
    short: {
        type: String,
        unique: true
    },
    visits:{
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('link', LinkSchema);