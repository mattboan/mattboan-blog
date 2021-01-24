"use strict";
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const { isNullOrUndefined } = require("util");
const url = require("./config/URL");

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

//Express middleware
//app.use(cors());
app.use(bodyParser.json());
//use cors to allow cross origin resource sharing
app.use(
	cors({
		origin: url.frontend,
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));

//MySQL setup
const con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DB,
});

con.connect(); //Connect to the database

/**
 * TODO:
 *  -Need to limit the size of the file uploads, downsample them if needed
 *  -Add the temp uploads to a designated destination folder
 *  -Add the image path to the appropriate mysql table record
 *  -Update all of the attributes in the mysql table record
 *  -Verify that the user has permission to do this
 */
app.post("/test", upload.single("headerImage"), (req, res) => {
	//console.log("/test image:" + JSON.stringify(req.file));
	//console.log("/test body: " + JSON.stringify(JSON.parse(req.body.project), null, 2));
	let project = JSON.parse(req.body.project);

	console.log("req.file " + req.file);
	console.log("post: " + project.post);

	if (req.file) {
		project.image = "http://localhost:8080/" + req.file.path;
	}

	con.query(
		"UPDATE Projects SET name = ?, image = ?, post = ? WHERE id = ?",
		[project.name, project.image, project.post, project.id],
		function (err, result) {
			if (err) res.send(err.message);
			res.json(result);
		}
	);
});

//Get recent projects
/**
 * IMPORTANT - REMOVE THE setTimeout() when on live server!
 */
app.get("/projects", (req, res) => {
	setTimeout(function () {
		con.query("SELECT * FROM Projects", function (err, result) {
			if (err) res.send(err.message);
			res.json(result);
		});
	});
});

/**
 * Todo:
 * - Need to look into tags before looking into the projects
 * - look into the double colons - WHAT DOES THIS MEAN?
 */
app.get("/queryProjects::query", (req, res) => {
	console.log(req.params.query);
	con.query(
		"SELECT * FROM Projects WHERE MATCH(name, description) against (? IN BOOLEAN MODE)",
		req.params.query,
		function (err, result) {
			if (err) res.send(err.message);
			res.json(result);
		}
	);
});

//Get a single project
app.get("/project:id", (req, res) => {
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
