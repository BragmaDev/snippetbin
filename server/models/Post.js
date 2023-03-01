const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema ({
    userId: {type: mongoose.Types.ObjectId},
    posterName: {type: String},
    title: {type: String},
    snippet: {type: String},
    votes: {type: Array},
    rating: {type: Number},
    lastEdited: {type: Date}
});

module.exports = mongoose.model("posts", postSchema);