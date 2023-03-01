const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let commentSchema = new Schema ({
    postId: {type: mongoose.Types.ObjectId},
    userId: {type: mongoose.Types.ObjectId},
    posterName: {type: String},
    content: {type: String},
    votes: {type: Array},
    rating: {type: Number},
    lastEdited: {type: Date}
});

module.exports = mongoose.model("comments", commentSchema);