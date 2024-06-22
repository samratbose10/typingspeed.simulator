const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    slackId: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', UserSchema);
