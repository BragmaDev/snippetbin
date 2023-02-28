var express = require('express');
var mongoose = require('mongoose');
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
    const post = await Post.findById(req.params.id)
        .catch(err => { throw err });
    return res.json(post);
});

// get comments by post id
router.get('/:id/comments', async function (req, res, next) {
    const comments = await Comment.find({ postId: mongoose.Types.ObjectId(req.params.id) })
        .catch(err => { throw err });
    return res.json(comments);
});

// create new post
router.post('/', validateToken, function (req, res, next) {
    const post = {
        userId: req.user.id,
        title: req.body.title,
        snippet: req.body.snippet,
        votes: [],
        rating: 0
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

// vote on a post
router.put('/:id', validateToken, function (req, res, next) {
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(404).json({success: false});
            }
            const index = post.votes.findIndex(vote => vote.userId === req.user.id);           
            if (index === -1) {
                // user has not voted on this post yet, add requested vote
                post.votes.push({userId: req.user.id, vote: req.body.vote});
                // calculate post rating
                post.rating = post.votes.map(vote => vote.vote)
                    .reduce((a, b) => a+b);
                post.save();
                return res.json({success: true});
            } else {
                // user has already voted on this post, replace old vote
                post.votes[index] = {...post.votes[index], vote: req.body.vote};
                // calculate post rating
                post.rating = post.votes.map(vote => vote.vote)
                    .reduce((a, b) => a+b);
                post.save();
                return res.json({success: true});
            }
        })
        .catch(err => { throw err });
});

module.exports = router;
