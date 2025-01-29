const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true
    }
},{
    versionKey: false,
    timestamps: true,
    collection: "Words"
})

const words = mongoose.model('Words', wordSchema)

module.exports = words;