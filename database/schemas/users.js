
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 4,
        max: 100,
        set: v => { return v.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); }); }
    },
    email: {
        type: String,
        min: 4,
        max: 255
    },
    password: {
        type: String,
        min: 4,
        max: 255
    },
    token: {
        type: String,
        default: null
    }
}, { versionKey: false, timestamps: true });

module.exports = userSchema;