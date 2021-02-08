"use strict";
require("dotenv").config();

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

//Authentication
const { env } = require("process");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("./middleware/auth");

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

//Express middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/images", express.static(__dirname + "/images"));

//use cors to allow cross origin resource sharing
app.use(
	cors({
		origin: url.frontend,
		credentials: true,
	})
);

//MySQL setup
const con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DB,
});

con.connect(); //Connect to the database

//Allow static access to the front-end
app.use(express.static(`${__dirname}/front-end/build`));

//Match any route if a predefined route doesn't exist
app.get("/", function (req, res) {
	res.sendFile(`${__dirname}/front-end/build/index.html`);
});

app.post("/RegisterUser", auth.deauthenitcateToken, (req, res) => {
	console.log("/api/register");
	console.log("username: " + req.body.username);
	console.log("password: " + req.body.password);

	if (!req.body.username || !req.body.password) {
		res.json({ error: "error" });
	}

	bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
		con.query(
			"INSERT INTO Users (username, password) VALUES (?, ?)",
			[req.body.username, hash],
			function (err, result) {
				if (err) res.json({ success: false });
				res.json({ success: true });
			}
		);
	});
});

app.post("/Login", (req, res) => {
	con.query(
		"SELECT password, id FROM Users WHERE username = ?",
		[req.body.username],
		function (err, result) {
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
						res.send({ status: "bad" });
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

		con.query(
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

app.post("/DeleteProject", body.single(), (req, res) => {
	console.log("/DeleteProjects called".cyan);

	con.query("DELETE FROM Projects WHERE id", [req.body.id], (err, result) => {
		if (err) res.json({ error: err.message });
		if (result.length) res.json({ deleted: true });
		else res.json({ delete: false });
	});
});

app.post("/TagExists", body.single(), (req, res) => {
	console.log("/TagExists called: ".cyan + req.body.text);

	con.query(
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
app.post("/InsertTag", body.single(), (req, res) => {
	var tag = JSON.parse(req.body.tag);
	con.query(
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
	con.query(
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

app.post("/InsertIntoProjectsTags", body.single(), (req, res) => {
	console.log("/InsertIntoProjectsTags called".cyan);
	con.query(
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
});

app.post("/DeleteTag", body.single(), (req, res) => {
	con.query(
		"DELETE FROM ProjectsTags WHERE tag_id = ?",
		[req.body.id],
		(err, result) => {
			if (err) console.log(err);
			res.json({ done: "deleted" });
		}
	);
});

//We need to create a new project and then just return the ID
app.post("/CreateNewProject", (req, res) => {
	console.log("CreateNewProject called".cyan);

	con.query(
		"INSERT INTO Projects () VALUES ()",
		function (err, result, fields) {
			if (err) res.send(err.message);
			res.json(result.insertId);
		}
	);
});

//Get recent projects
/**
 * IMPORTANT - REMOVE THE setTimeout() when on live server!
 */
app.get("/projects", (req, res) => {
	console.log("/projects called".cyan);

	con.query("SELECT * FROM Projects", function (err, result) {
		if (err) res.send(err.message);
		res.json(result);
	});
});

app.get("/tags", (req, res) => {
	console.log("/tags called".cyan);
	con.query("SELECT * FROM Tags", function (err, result) {
		if (err) res.send(err.message);
		res.json(result);
	});
});

app.get("/queryProjects::query", (req, res) => {
	console.log("/queryProjects called - query = ".cyan + req.params.query);
	con.query(
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
	con.query(
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

	con.query(
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

	con.query(
		"SELECT Tags.id, Tags.text, Tags.color FROM Tags INNER JOIN ProjectsTags ON  ProjectsTags.tag_id = Tags.id WHERE ProjectsTags.project_id = ?",
		req.params.id,
		function (err, tags) {
			res.json(tags);
		}
	);
});

app.listen(port, () => {
	console.log(`Server started at ${port}`);
});
