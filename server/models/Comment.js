const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let commentSchema = new Schema ({
    postId: {type: String},
    userId: {type: String},
    content: {type: String}
});

module.exports = mongoose.model("comments", commentSchema);