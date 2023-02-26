var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
const validateToken = require("../auth/validateToken");

// get list of posts
router.get('/', async function (req, res, next) {
    const posts = await Post.find({})
        .catch(err => { throw err });
    return res.json(posts);
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

module.exports = router;
