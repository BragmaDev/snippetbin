var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const validateToken = require("../auth/validateToken");

// regex for validating password
const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

// register new user
router.post('/register',
	body("username").trim().isLength({ min: 3 }).escape(),
	body("email").trim().isEmail().escape(),
	body("password").isLength({ min: 5 }).matches(regex),
	(req, res, next) => {
		// validate request
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: "Invalid username, email, or password" });
		}
		// check that the email or username is not in use by another user
		User.findOne().or([{ email: req.body.email }, { username: req.body.username }])
			.then(user => {
				if (user) {
					return res.status(403).json({ message: "Email or username already in use" });
				} else {
					bcrypt.genSalt(10, (err, salt) => {
						if (err) throw err;
						bcrypt.hash(req.body.password, salt, (err, hash) => {
							if (err) throw err;
							const newUser = {
								username: req.body.username,
								email: req.body.email,
								password: hash
							}
							// create user entry in the db
							User.create(newUser)
								.then(ok => { return res.json({ success: true }) })
								.catch(err => { throw err });
						});
					});
				}
			})
			.catch(err => { throw err });
});

// user login
router.post("/login",
	body("email").trim().isEmail().escape(),
	body("password"),
	(req, res, next) => {
		// validate request
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		User.findOne({ email: req.body.email })
			.then(user => {
				if (!user) {
					return res.status(403).json({ message: "Incorrect email or password." });
				} else {
					// match password
					bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
						if (err) throw err;
						if (isMatch) {
							const jwtPayload = {
								id: user._id,
								username: user.username,
								email: user.email
							}
							// create jsonwebtoken
							jwt.sign(
								jwtPayload,
								process.env.SECRET,
								{ },
								(err, token) => {
									if (err) throw err;
									res.json({ success: true, token });
								}
							);
						} else {
							res.json({ success: false });
						}
					});
				}
			})
			.catch(err => { throw err });		
});

// check if user is authenticated
router.get("/verify", validateToken, function (req, res, next) {
	return res.json({verified: true, user: req.user});
});


module.exports = router;
