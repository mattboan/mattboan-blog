const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

var db = require("../db");

function authenticateToken(req, res, next) {
	// Gather the jwt access token from the request header
	console.log(req.headers);
	const authHeader = req.headers["authorization"];
	console.log("authHeader: " + authHeader);
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) return res.sendStatus(401); // if there isn't any token

	console.log("Token: " + token);

	//After we verify the token it's best practice to check that the returend userID.userID is inside the database
	jwt.verify(token, process.env.TOKEN_SECRET, (err, userID) => {
		console.log(err);
		if (err) return res.sendStatus(403);

		db.query("SELECT id FROM Users WHERE id = 2", (err, result) => {
			if (err) {
				console.log(err);
				return res.sendStatus(403);
			}

			if (!result.length) return next(); //pass the execution off to whatever request the client intended
		});
	});
}

function deauthenitcateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	console.log("authHeader: " + authHeader);
	const token = authHeader && authHeader.split(" ")[1];
	if (token === undefined || token == null) {
		return next();
	}

	console.log("Token: " + token);
	jwt.verify(token, process.env.TOKEN_SECRET, (err, userID) => {
		console.log(err);
		if (err) return res.sendStatus(403);
		req.userID = userID;

		return res.sendStatus(403);
	});
}

function generateAccessToken(userID, secret) {
	return jwt.sign(userID, secret, { expiresIn: "2000s" });
}

const auth = {
	authenticateToken: authenticateToken,
	generateAccessToken: generateAccessToken,
	deauthenitcateToken: deauthenitcateToken,
};
module.exports = auth;
