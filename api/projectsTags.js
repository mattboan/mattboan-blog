const express = require("express");
const log = require("../logs/routes");
const projectsTags = require("../logic/projectsTags");
const router = express.Router();

/**
 * This route returns 1 if the projecttags record exists
 */
router.get("/api/projects-tags-exists", async (req, res) => {
	log.route("/api/projects-tags-exists");

	//Try to parse the request variables
	try {
		var tag_id = req.body.tag_id;
		var project_id = req.body.project_id;
	} catch (err) {
		log.error("/api/projects-tags-exists", err);
		res.status(400).send();
	}

	try {
		var result = await projectsTags.exists(tag_id, project_id);
		console.log(result);
		res.json(result);
	} catch (err) {
		log.error("/api/projects-tags-exists", err);
		res.status(500).send();
	}
});

/**
 * This route creates a ProjectTags record
 * @TODO - Need to add authentication here
 */
router.post("/api/create-projects-tags", async (req, res) => {
	log.route("/api/create-projects-tags");

	//Try to parse the request variables
	try {
		var tag_id = req.body.tag_id;
		var project_id = req.body.project_id;
	} catch (err) {
		log.error("/api/create-projects-tags", err);
		res.status(400).send();
	}

	//Pass to the logic level to insert into the database
	try {
		var result = await projectsTags.create(tag_id, project_id);
		res.json({ tag: result });
	} catch (err) {
		log.error("/api/create-projects-tags", err);
		res.status(500).send();
	}
});

/**
 * This route deletes a projects tags record based off the tag_id and project_id
 */
router.delete("/api/delete-projects-tags", async (req, res) => {
	log.route("/api/delete-projects-tags");

	//Try to parse the request variables
	try {
		var tag_id = req.body.tag_id;
		var project_id = req.body.project_id;
	} catch (err) {
		log.error("/api/delete-projects-tags", err);
		res.status(400).send();
	}

	//Pass to the logic level to insert into the database
	try {
		var result = await projectsTags.remove(tag_id, project_id);
		res.json({ tag: result });
	} catch (err) {
		log.error("/api/delete-projects-tags", err);
		res.status(500).send();
	}
});

module.exports = router;
