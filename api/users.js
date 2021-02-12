const express = require("express");
const auth = require("../middleware/auth");
const log = require("../logs/routes");
const users = require("../logic/users");
const bodyParser = require("body-parser");
const bouncer = require("express-bouncer")(12000, 900000); //min=2min max=10min
const router = express.Router();

const MSG = "Too many requests have been made, please wait: ";

// In case we want to supply our own error (optional)
bouncer.blocked = function (req, res, next, remaining) {
	res.send(429, MSG + remaining / 1000 + "minutes.");
};

/**
 * This route registers a user, will be turned off once server is deployed
 * @TODO - Need to add deauthentication
 */
router.post("/api/register-user", auth.deauthenitcateToken, async (req, res) => {
	log.route("/api/register-user");

	//Try to parse the request variables
	try {
		var username = req.body.username;
		var password = req.body.password;
	} catch (err) {
		log.error("/api/register-user", err);
		return res.status(400).send();
	}

	//Pass the inputs over to the logic
	try {
		var result = await users.register(username, password);
		res.json({ result: result });
	} catch (err) {
		log.error("/api/register-user", err);
		res.status(500).send();
	}
});

/**
 * This route checks if a user, already exists for a particular username
 */
router.get("/api/user-exists", async (req, res) => {
	//Try to parse the request variables
	try {
		var username = req.body.username;
		if (!username) throw "no username provided";
	} catch (err) {
		log.error("/api/user-exists", err);
		return res.status(400).send();
	}

	//Pass the inputs over to the logic
	try {
		var result = await users.exists(username);
		res.json({ result: result });
	} catch (err) {
		log.error("/api/user-exists", err);
		res.status(500).send();
	}
});

/**
 * This route will login a user
 */
router.post("/api/login-user", bouncer.block, async (req, res) => {
	log.route("/api/login-user");
	//Try to parse the request variables
	try {
		var username = req.body.username;
		var password = req.body.password;
	} catch (err) {
		log.error("/api/login-user", err);
		return res.status(400).send();
	}

	//Pass over the request variables to the logic to authenticate the user
	try {
		var result = await users.login(username, password);
		res.json({ token: result });
	} catch (err) {
		log.error("/api/login-user", err);
		res.status(500).send();
	}
});

module.exports = router;
