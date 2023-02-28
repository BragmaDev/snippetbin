const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema ({
    userId: {type: mongoose.Types.ObjectId},
    title: {type: String},
    snippet: {type: String},
    votes: {type: Array} 
});

module.exports = mongoose.model("posts", postSchema);