"use strict";
require("dotenv").config();

const express = require("express");
const loaders = require("./loaders");

async function startServer() {
	const app = express();

	await loaders(app);

	app.listen(process.env.PORT, (err) => {
		if (err) {
			console.log("ERROR: " + err);
			return;
		}
		console.log("🍦 Server is ready to serve!");
	});
}

startServer();

/*
const http = require("http");
const https = require("https");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const url = require("./config/URL");
const colors = require("colors");
const { RSA_NO_PADDING } = require("constants");
const nodemailer = require("nodemailer");
const history = require("connect-history-api-fallback");
var db = require("./loaders/mysql");

//Authentication
const { env } = require("process");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("./middleware/auth");
var bouncer = require("express-bouncer")(12000, 900000); //min=2min max=10min

//HTTPS Config
const privateKey = fs.readFileSync(
	"/etc/letsencrypt/live/www.mattboan.com/privkey.pem",
	"utf8"
);
const certificate = fs.readFileSync(
	"/etc/letsencrypt/live/www.mattboan.com/cert.pem",
	"utf8"
);
const ca = fs.readFileSync(
	"/etc/letsencrypt/live/www.mattboan.com/chain.pem",
	"utf8"
);

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca,
};

const saltRounds = 10;

var transport = nodemailer.createTransport({
	service: "gmail",
	auth: {
		type: "OAuth2",
		user: process.env.EMAIL_USER,
		clientId: process.env.EMAIL_ID,
		clientSecret: process.env.EMAIL_SECRET,
		refreshToken: process.env.EMAIL_REF_TOK,
	},
});

//Express init
const app = express();
const port = 8080;

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
	},
});
const upload = multer({ storage: storage });
const body = multer();

app.post("/RegisterUser", auth.deauthenitcateToken, (req, res) => {
	console.log("username: " + req.body.username);
	console.log("password: " + req.body.password);

	if (!req.body.username || !req.body.password) {
		res.json({ error: "error" });
	}

	bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
		db.query(
			"INSERT INTO Users (username, password) VALUES (?, ?)",
			[req.body.username, hash],
			function (err, result) {
				if (err) res.json({ success: false });
				res.json({ success: true });
			}
		);
	});
});

// In case we want to supply our own error (optional)
bouncer.blocked = function (req, res, next, remaining) {
	console.log("in bouncer.blocked");
	res.send(
		429,
		"Too many requests have been made, " +
			"please wait " +
			remaining / 1000 +
			" seconds"
	);
};

app.post("/Login", [bouncer.block, body.single()], (req, res) => {
	console.log("username: " + req.body.username);
	console.log("password: " + req.body.password);

	db.query(
		"SELECT id, password FROM Users WHERE username = ?",
		[req.body.username],
		function (err, result) {
			if (err) res.send({ error: err });

			bcrypt.compare(
				req.body.password,
				result[0].password,
				function (err, authed) {
					if (authed) {
						//If authenticated send back the jwt token
						const token = auth.generateAccessToken(
							{ userID: result[0].id },
							process.env.TOKEN_SECRET
						);

						res.json({ token: token, status: "good" });
					} else {
						res.json({ status: "bad" });
					}
				}
			);
		}
	);
});

app.post("/SendEmail", body.single(), (req, res) => {
	const message = {
		from: process.env.EMAIL_USER, // Sender address
		to: process.env.EMAIL_DEST, // List of recipients
		subject: req.body.subject, // Subject line
		text: "From: " + req.body.from + "\n" + req.body.msg, // Plain text body
	};

	//Send the message to my DEST EMAIL
	transport.sendMail(message, function (err, info) {
		if (err) {
			console.log(err);
			res.json({ status: "fail" });
		} else {
			console.log(info);
			SendConfirmationEmail(req);
			res.json({ status: "sent" });
		}
	});
});

function SendConfirmationEmail(req) {
	const message = {
		from: process.env.EMAIL_USER, // Sender address
		to: req.body.from, // List of recipients
		subject: "Confirmation from mattboan.com", // Subject line
		text:
			"Thanks for getting in touch, I will get back to you as soon as possible!", // Plain text body
	};

	//Send the message to my DEST EMAIL
	transport.sendMail(message, function (err, info) {
		if (err) {
			console.log(err);
		} else {
			console.log(info);
		}
	});
}

app.post(
	"/UpdateProject",
	[auth.authenticateToken, upload.single("headerImage")],
	(req, res) => {
		console.log("/UpdateProject called".cyan);

		var project = JSON.parse(req.body.project); //Need to parse the stringyfied project
		var post = JSON.stringify(project.post); //Need to extract this from the project and stringify it

		if (req.file) {
			project.image = url.backend + "/" + req.file.path;
		}

		db.query(
			"UPDATE Projects SET name = ?, description = ?, image = ?, post = ? WHERE id = ?",
			[
				project.name,
				project.description,
				project.image,
				post,
				project.id,
			],
			function (err, result) {
				if (err) res.send(err.message);
				res.json(result);
			}
		);
	}
);

app.post(
	"/DeleteProject",
	[auth.authenticateToken, body.single()],
	(req, res) => {
		console.log("/DeleteProjects called id: ".cyan + req.body.id);

		db.query(
			"DELETE FROM Projects WHERE id = ?",
			[req.body.id],
			(err, result) => {
				console.log(
					"Result: " + JSON.stringify(result) + " Error: " + err
				);
				if (err) res.json({ error: err.message });
				if (result.affectedRows === 1) res.json({ deleted: true });
				else res.json({ delete: false });
			}
		);
	}
);

app.post("/TagExists", body.single(), (req, res) => {
	console.log("/TagExists called: ".cyan + req.body.text);

	db.query(
		"SELECT id FROM Tags WHERE text = ?",
		[req.body.text],
		(err, result) => {
			if (err) res.json({ error: err.message });
			if (result.length) res.json({ tagExists: true, id: result[0].id });
			else res.json({ tagExists: false });
		}
	);
});

//Insert into the Tags
app.post("/InsertTag", [auth.authenticateToken, body.single()], (req, res) => {
	var tag = JSON.parse(req.body.tag);
	db.query(
		"INSERT INTO Tags (text, color) VALUES (?, ?)",
		[tag.text, tag.color],
		(err, result) => {
			if (err) {
				res.json({ error: "Failed to insert into Tags." });
				console.log(err.message);
				return;
			}

			res.json({ id: result.insertId });
		}
	);
});

//Check if the tag id is linked to the project id
app.post("/ProjectsTagsExists", body.single(), (req, res) => {
	console.log("t: " + req.body.tagId + " - p: " + req.body.projectId);
	db.query(
		"SELECT tag_id FROM ProjectsTags WHERE tag_id = ? AND project_id = ?",
		[req.body.tagId, req.body.projectId],
		(err, result) => {
			if (err) res.json({ error: err.message });
			console.log(JSON.stringify(result));
			if (result.length)
				res.json({ linkExists: true, id: result[0].tag_id });
			else res.json({ linkExists: false });
		}
	);
});

app.post(
	"/InsertIntoProjectsTags",
	[auth.authenticateToken, body.single()],
	(req, res) => {
		console.log("/InsertIntoProjectsTags called".cyan);
		db.query(
			"INSERT INTO ProjectsTags (tag_id, project_id) VALUES (?, ?)",
			[req.body.tagId, req.body.projectId],
			(err, result) => {
				if (err) {
					res.json({ error: "Failed insertion." });
					console.log(err.message);
				}
				console.log(result);
				res.json(result);
			}
		);
	}
);

app.post("/DeleteTag", [auth.authenticateToken, body.single()], (req, res) => {
	db.query(
		"DELETE FROM ProjectsTags WHERE tag_id = ?",
		[req.body.id],
		(err, result) => {
			if (err) console.log(err);
			res.json({ done: "deleted" });
		}
	);
});

//We need to create a new project and then just return the ID
app.post("/CreateNewProject", auth.authenticateToken, (req, res) => {
	console.log("CreateNewProject called".cyan);

	db.query(
		"INSERT INTO Projects () VALUES ()",
		function (err, result, fields) {
			if (err) res.send(err.message);
			res.json(result.insertId);
		}
	);
});

//Get recent projects
app.get("/projects", (req, res) => {
	console.log("/projects called".cyan);

	db.query("SELECT * FROM Projects", function (err, result) {
		if (err) res.send(err.message);
		res.json(result);
	});
});

app.get("/tags", (req, res) => {
	console.log("/tags called".cyan);
	db.query("SELECT * FROM Tags", function (err, result) {
		if (err) res.send(err.message);
		res.json(result);
	});
});

app.get("/queryProjects::query", (req, res) => {
	console.log("/queryProjects called - query = ".cyan + req.params.query);
	db.query(
		"SELECT * FROM Projects WHERE MATCH(name, description) against (? IN BOOLEAN MODE)",
		req.params.query,
		function (err, result) {
			if (err) res.send(err.message);
			res.json(result);
		}
	);
});

app.get("/queryTags::query", (req, res) => {
	console.log("/queryTags called - query = ".cyan + req.params.query);
	db.query(
		"SELECT * FROM Projects WHERE id = (SELECT ProjectsTags.project_id FROM ProjectsTags WHERE ProjectsTags.tag_id = ?)",
		req.params.query,
		function (err, result) {
			if (err) res.send(err.message);
			res.json(result);
		}
	);
});

//Get a single project
app.get("/project:id", (req, res) => {
	console.log("/project called - id = ".cyan + req.params.id);

	db.query(
		"SELECT * FROM Projects WHERE id = ?",
		req.params.id,
		function (err, result) {
			if (err) res.send(err.message);
			res.json(result);
		}
	);
});

//Get tags for a project
app.get("/tags:id", (req, res) => {
	console.log("/project called - id = ".cyan + req.params.id);

	db.query(
		"SELECT Tags.id, Tags.text, Tags.color FROM Tags INNER JOIN ProjectsTags ON  ProjectsTags.tag_id = Tags.id WHERE ProjectsTags.project_id = ?",
		req.params.id,
		function (err, tags) {
			res.json(tags);
		}
	);
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80);
httpsServer.listen(443);
*/
