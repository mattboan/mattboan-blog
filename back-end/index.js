"use strict";
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//Express init
const app = express();
const port = 8080;

//Express middleware
//app.use(cors());
app.use(bodyParser.json());
//use cors to allow cross origin resource sharing
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    console.log("/test image:" + req.file);
    console.log("/test body: " + req.body.name);
    res.json({ done: "done" });
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

//Search projects
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
