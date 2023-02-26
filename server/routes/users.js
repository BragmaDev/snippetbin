var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
//const validateToken = require("../auth/validateToken");

// regex for validating password
const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()\-_+={}\[\]|\\;:"<>,.\/?])/;

router.get('/', (req, res) => {
	return res.send("hey");
})

// register new user
router.post('/register',
	// validate email and password
	body("email").trim().isEmail().escape(),
	body("password").isLength({ min: 8 }).matches(regex),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// check that the email or username is not in use by another user
		User.findOne().or([{ email: req.body.email }, { username: req.body.username }])
			.then(user => {
				if (user) {
					return res.status(403).json({ error: "Email already in use" });
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
							User.create(newUser, (err) => {
								if (err) throw err;
								return res.send("User registered succesfully.");
							});
						});
					});
				}
			})
			.catch(err => { throw err });
	});

module.exports = router;
