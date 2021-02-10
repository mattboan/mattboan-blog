const mysql = require("../loaders/mysql");
const bcrypt = require("bcrypt");
const util = require("util");
const auth = require("../middleware/auth");
const dotenv = require("dotenv").config();

const query = util.promisify(mysql.query).bind(mysql);
const saltRounds = 10;

/**
 * Get hashed password from the database, compare using bcrypt, sign a token
 * @param {string} username
 * @param {string} password
 */
const login = async (username, password) => {
	//Get user details from the database
	try {
		var result = await query("SELECT id, password FROM Users WHERE username = ?", username);
	} catch (err) {
		throw err;
	}

	//Compare the password passed in from username and the one from the database
	try {
		var authed = await bcrypt.compare(password, result[0].password);
	} catch (err) {
		throw err;
	}

	//Sign a jwt token
	try {
		var token = null;
		if (authed)
			var token = auth.generateAccessToken({ username: username }, process.env.TOKEN_SECRET);
	} catch (err) {
		throw err;
	}

	return token;
};

/**
 * Hash password, add user to users table
 */
const register = async (username, password) => {
	//Try to hash the password
	try {
		var hash = await bcrypt.hash(password, saltRounds);
	} catch (err) {
		throw err;
	}

	try {
		var result = await query("INSERT INTO Users (username, password) VALUES (?, ?)", [
			username,
			hash,
		]);
		return result.affectedRows;
	} catch (err) {
		throw err;
	}
};

const exists = async (username) => {
	try {
		var result = await query("SELECT id FROM Users WHERE username = ?", username);
		if (result.length) return true;
		else return false;
	} catch (err) {
		throw err;
	}
};

module.exports = {
	register,
	exists,
	login,
};
