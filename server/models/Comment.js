const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let commentSchema = new Schema ({
    postId: {type: mongoose.Types.ObjectId},
    userId: {type: mongoose.Types.ObjectId},
    content: {type: String}
});

module.exports = mongoose.model("comments", commentSchema);