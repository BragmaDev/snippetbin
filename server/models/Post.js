const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema ({
    userId: {type: mongoose.Types.ObjectId},
    title: {type: String},
    snippet: {type: String},
    votes: {type: Array},
    rating: {type: Number}
});

module.exports = mongoose.model("posts", postSchema);