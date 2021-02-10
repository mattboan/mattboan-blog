const express = require("express");
const log = require("../logs/routes");
const tags = require("../logic/tags");
const router = express.Router();

/**
 * This route returns all the tags
 */
router.get("/api/tags", async (req, res) => {
	log.route("/api/tags");

	try {
		var result = await tags.gets();
		res.json({ tags: result });
	} catch (err) {
		log.error("/api/tags", err);
		res.status(500).send();
	}
});

/**
 * This route gets all the tags associated with a specific project (determined by the passed id)
 */
router.get("/api/project-tags::id", async (req, res) => {
	log.route("/api/tag::id");

	var id = req.params.id;

	try {
		var result = await tags.getProjectTags(id);
		res.json({ tags: result });
	} catch (err) {
		log.error("/api/tag::id", err);
		res.status(500).send();
	}
});

/**
 * This route inserts a tag
 * @TODO - need to add authentication
 */
router.post("/api/create-tag", async (req, res) => {
	log.route("/api/create-tag");

	console.log(req.body);

	//Try to parse the request body and retrieve the tag to be inserted
	try {
		var tag = { text: req.body.text, color: req.body.color };
	} catch (err) {
		log.error("/api/create-tag", err);
		res.status(400).send();
	}

	//Insert into database
	try {
		var result = await tags.create(tag);
		res.json({ id: result });
	} catch (err) {
		log.error("/api/create-tag", err);
		res.status(500).send();
	}
});

/**
 * This route checks to see if a tag exists
 */
router.get("/api/tag-exists::text", async (req, res) => {
	log.route("/api/tag-exists::text");

	var text = req.params.text;

	try {
		var result = await tags.exists(text);
		res.json({ exists: result });
	} catch (err) {
		log.error("/api/tag-exists::text", err);
		res.status(500).send();
	}
});

/**
 * This route deletes a tag
 * @TODO - add authentication
 */
router.delete("/api/delete-tag::id", async (req, res) => {
	log.route("/api/delete-tag::id");

	var id = req.params.id;

	try {
		var result = await tags.remove(id);
		res.json({ deleted: result });
	} catch (err) {
		log.error("/api/delete-tag::id", err);
		res.status(500).send();
	}
});

module.exports = router;
