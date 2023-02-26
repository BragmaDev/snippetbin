var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var Comment = require('../models/Comment');
const validateToken = require("../auth/validateToken");

// get list of posts
router.get('/', async function (req, res, next) {
    const posts = await Post.find({})
        .catch(err => { throw err });
    return res.json(posts);
});

// get single post by id
router.get('/:id', async function (req, res, next) {
    const post = await Post.findOne({ _id: req.params.id })
        .catch(err => { throw err });
    return res.json(post);
});

// get comments by post id
router.get('/:id/comments', async function (req, res, next) {
    const comments = await Comment.find({ postId: req.params.id })
        .catch(err => { throw err });
    return res.json(comments);
});

// create new post
router.post('/', validateToken, function (req, res, next) {
    const post = {
        userId: req.user.id,
        snippet: req.body.snippet
    };
    // create db entry
    Post.create(post)
        .then(ok => { return res.json({ success: true }) })
        .catch(err => { throw err });
});

// create new comment on post
router.post('/:id/comments', validateToken, function (req, res, next) {
    const comment = {
        postId: req.params.id,
        userId: req.user.id,
        content: req.body.content
    };
    // create db entry
    Comment.create(comment)
        .then(ok => { return res.json({ success: true }) })
        .catch(err => { throw err });
});


module.exports = router;
