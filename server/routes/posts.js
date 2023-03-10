var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Post = require('../models/Post');
var Comment = require('../models/Comment');
const validateToken = require("../auth/validateToken");

// get list of posts by page and search term
router.get('/', async function (req, res, next) {
    // pagination source: https://www.youtube.com/watch?v=soWg_UtD_AM
    const pageSize = 10;
    const page = parseInt(req.query.page || "0");
    const regex = new RegExp((req.query.search || ""), "i");
    // find the search term in the title or the snippet
    const filter = { $or: [{title: {$regex: regex}}, {snippet: {$regex: regex}}] }
    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
        // sort posts by date
        .sort({ _id: -1 })
        .limit(pageSize)
        .skip(pageSize * page)
        .catch(err => { throw err });
    return res.json({
        posts, 
        total: Math.ceil(total / pageSize)
    });
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
        // sort by date
        .sort({ _id: -1 })
        .catch(err => { throw err });
    return res.json(comments);
});

// get single comment by id
router.get('/comments/:id', async function (req, res, next) {
    const comment = await Comment.findById(req.params.id)
        .catch(err => { throw err });
    return res.json(comment);
});

// create new post
router.post('/', validateToken, function (req, res, next) {
    const post = {
        userId: req.user.id,
        posterName: req.user.username,
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
        posterName: req.user.username,
        content: req.body.content,
        votes: [],
        rating: 0
    };
    // create db entry
    Comment.create(comment)
        .then(ok => { return res.json({ success: true }) })
        .catch(err => { throw err });
});

// edit a post
router.put('/:id', validateToken, function (req, res, next) {
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                // post not found
                return res.status(404).json({success: false});
            }        
            if (post.userId != req.user.id) {
                // user is trying to edit someone else's post
                return res.status(401).json({success: false});
            }
            // apply edit
            post.title = req.body.title;
            post.snippet = req.body.snippet;
            post.lastEdited = new Date();
            post.save();
            res.json({success: true});
        })
        .catch(err => { throw err });
});

// edit a comment
router.put('/comments/:id', validateToken, function (req, res, next) {
    Comment.findById(req.params.id)
        .then(comment => {
            if (!comment) {
                // comment not found
                return res.status(404).json({success: false});
            }        
            if (comment.userId != req.user.id) {
                // user is trying to edit someone else's comment
                return res.status(401).json({success: false});
            }
            // apply edit
            comment.content = req.body.content;
            comment.lastEdited = new Date();
            comment.save();
            res.json({success: true});
        })
        .catch(err => { throw err });
});

// vote on a post
router.put('/votes/:id', validateToken, function (req, res, next) {
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                // post not found
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
                return res.json({success: true, userVote: req.body.vote, rating: post.rating});
            }
            // user has already voted on this post
            if (post.votes[index].vote === req.body.vote) {
                // user is trying to cast the same vote, replace vote with 0
                post.votes[index] = { ...post.votes[index], vote: 0 };
                // calculate post rating
                post.rating = post.votes.map(vote => vote.vote)
                    .reduce((a, b) => a+b);
                post.save();
                return res.json({success: true, userVote: 0, rating: post.rating});
            } else {
                // user is replacing their old vote with the opposite one
                post.votes[index] = {...post.votes[index], vote: req.body.vote};
                // calculate post rating
                post.rating = post.votes.map(vote => vote.vote)
                    .reduce((a, b) => a+b);
                post.save();
                return res.json({success: true, userVote: req.body.vote, rating: post.rating});
            }       
        })
        .catch(err => { throw err });
});

// vote on a comment
router.put('/comments/votes/:id', validateToken, function (req, res, next) {
    Comment.findById(req.params.id)
        .then(comment => {
            if (!comment) {
                // comment not found
                return res.status(404).json({success: false});
            }
            const index = comment.votes.findIndex(vote => vote.userId === req.user.id);           
            if (index === -1) {
                // user has not voted on this comment yet, add requested vote
                comment.votes.push({userId: req.user.id, vote: req.body.vote});
                // calculate comment rating
                comment.rating = comment.votes.map(vote => vote.vote)
                    .reduce((a, b) => a+b);
                comment.save();
                return res.json({success: true, userVote: req.body.vote, rating: comment.rating});
            }
            // user has already voted on this comment
            if (comment.votes[index].vote === req.body.vote) {
                // user is trying to cast the same vote, replace vote with 0
                comment.votes[index] = { ...comment.votes[index], vote: 0 };
                // calculate comment rating
                comment.rating = comment.votes.map(vote => vote.vote)
                    .reduce((a, b) => a+b);
                comment.save();
                return res.json({success: true, userVote: 0, rating: comment.rating});
            } else {
                // user is replacing their old vote with the opposite one
                comment.votes[index] = {...comment.votes[index], vote: req.body.vote};
                // calculate comment rating
                comment.rating = comment.votes.map(vote => vote.vote)
                    .reduce((a, b) => a+b);
                comment.save();
                return res.json({success: true, userVote: req.body.vote, rating: comment.rating});
            }   
        })
        .catch(err => { throw err });
});

module.exports = router;
