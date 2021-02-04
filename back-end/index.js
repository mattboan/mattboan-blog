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
const colors = require("colors");

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

app.post("/UpdateProject", upload.single("headerImage"), (req, res) => {
	console.log("/UpdateProject called".cyan);

	var project = JSON.parse(req.body.project); //Need to parse the stringyfied project
	var post = JSON.stringify(project.post); //Need to extract this from the project and stringify it

	if (req.file) {
		project.image = url.backend + "/" + req.file.path;
	}

	con.query(
		"UPDATE Projects SET name = ?, image = ?, post = ? WHERE id = ?",
		[project.name, project.image, post, project.id],
		function (err, result) {
			if (err) res.send(err.message);
			res.json(result);
		}
	);
});

/*
				NEED To refactor this function! -> split up the nesteed queries

				THE NESTED FUNCTIONS NEED TO IMPLEMENT THE CALLBACKS!!!!!!!!!!!!!!!!! await whatever the fuck get rid off it
*/
//Update the tags for a project
app.post("/UpdateTags", body.single(), (req, res) => {
	console.log("/UpdateTags called".cyan);
	//Parse the passed in tags and project id
	var tags = JSON.parse(req.body.tags);
	var projectID = req.body.projectID;
	console.log(tags);
	console.log(projectID);

	//Check if tag already exists
	tags.forEach((tag) => {
		con.query(
			"SELECT id FROM Tags WHERE text = ?",
			[tag],
			(err, result, fields) => {
				//If tag is there check if its in the joining table ProjectTags
				if (result[0]) {
					CheckProjectTags(
						result[0].id,
						projectID,
						(isThere, error) => {
							if (error) console.log(error.message);
							if (!isThere) {
								InsertIntoProjectTags(
									result[0].id,
									projectID,
									(iiptError) => {
										if (iiptError)
											console.log(iiptError.message);
									}
								);
							}
						}
					);
				}
				//If the tag is not there
				else {
				}
			}
		);
	});
	//con.query("SELECT id FROM Tags WHERE text = ?", [])
});

function CheckProjectTags(tag_id, project_id, callback) {
	con.query(
		"SELECT id FROM ProjectsTags WHERE tag_id = ? AND project_id = ?",
		[tag_id, project_id],
		(err, result, fields) => {
			if (err) callback(null, err);
			if (result[0]) {
				callback(true, null);
			}
			//The tag exists but isnt linked to the project specified
			else {
				callback(false, null);
			}
		}
	);
}

function InsertIntoProjectTags(tag_id, project_id, callback) {
	con.query(
		"INSERT INTO ProjectsTags (tag_id, project_id) VALUES (?, ?)",
		[tag_id, project_id],
		(err, result, fields) => {
			if (err) callback(err);
		}
	);
}

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
