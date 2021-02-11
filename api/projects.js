const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const project = require("../logic/projects");
var express = require("express");
var router = express.Router();
const log = require("../logs/routes");
const url = require("../config/URL");

//Setup multer to enable multi part forms
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

/**
 * This route returns all the projects
 */
router.get("/api/projects", async (req, res) => {
	log.route("/api/projects called");

	try {
		var result = await project.gets();
		res.json({ projects: result });
	} catch (err) {
		log.error("/api/projects", err);
		res.status(500).send();
	}
});

/**
 * This route gets a single project specified using the id
 */
router.get("/api/project::id", async (req, res) => {
	log.route("/api/project");
	const id = req.params.id;

	try {
		var p = await project.get(id);
		res.json({ project: p });
	} catch (err) {
		log.error("/api/project:id", err);
		res.status(500).send();
	}
});

/**
 * This route gets all projects with a specific tag
 */
router.get("/api/project-with-tag::id", async (req, res) => {
	log.route("/api/project-with-tag::id");

	var id = req.params.id;

	try {
		var result = await project.getWithTag(id);
		res.json({ projects: result });
	} catch (err) {
		log.error("/api/project-with-tag::id", err);
		res.status(500).send();
	}
});

/**
 * This route gets projects based off a query
 * @TODO - Should limit the size of the query
 */
router.get("/api/project-query::query", async (req, res) => {
	log.route("/api/project-query");

	var query = req.params.query;

	try {
		var result = await project.getWithQuery(query);
		res.json({ projects: result });
	} catch (err) {
		log.error("/api/project-query::query", err);
		res.status(500).send();
	}
});

/**
 * This route creates an empty project then returns the new projects id
 * @TODO - Need to add authentication middleware
 */
router.post("/api/create-project", async (req, res) => {
	log.route("/api/create-project");

	try {
		var result = await project.create();
		res.json({ id: result });
	} catch (err) {
		log.error("/api/create-project", err);
		res.status(500).send();
	}
});

/**
 * This route deletes a project based off an id
 * @TODO - Need to add authentication middleware
 */
router.delete("/api/remove-project::id", async (req, res) => {
	log.route("/api/remove-project");

	var id = req.params.id;

	try {
		var result = await project.remove(id);
		res.json({ deleted: result });
	} catch (err) {
		log.error("/api/remove-project", err);
		res.status(500).send();
	}
});

/**
 * This route updates a project
 * @TODO - Need to add authentication middleware
 */
router.post("/api/update-project", upload.single("header-image"), async (req, res) => {
	log.route("/api/update-project");

	//Try to get data from the request - needed incase a request is empty or not formulated correctly
	try {
		var proj = JSON.parse(req.body.project);
		if (req.file) proj.image = url.backend + "/" + req.file.path;
	} catch (err) {
		log.error("/api/update-project", "404 error: " + err);
		return res.status(400).send(); //Need to return this so the other responses don't get called
	}

	//Pass data to project logic to be processed
	try {
		var result = await project.edit(proj);
		res.json({ updated: result });
	} catch (err) {
		log.error("/api/update-project", err);
		res.status(500).send();
	}
});

module.exports = router;
