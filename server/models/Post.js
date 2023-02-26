const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema ({
    userId: {type: String},
    snippet: {type: String}
});

module.exports = mongoose.model("posts", postSchema);