const mysql = require("../loaders/mysql");
const util = require("util");

const query = util.promisify(mysql.query).bind(mysql);

/**
 * Get all the tags from the database
 * @TODO - Limit this response to a number of tags
 */
const gets = async () => {
	try {
		return await query("SELECT * FROM Tags");
	} catch (err) {
		throw err;
	}
};

/**
 * Create a tag
 * @param {Tag Object} tag
 */
const create = async (tag) => {
	try {
		let result = await query("INSERT INTO Tags (text, color) VALUES (?, ?)", [
			tag.text,
			tag.color,
		]);
		return result.insertId;
	} catch (err) {
		throw err;
	}
};

/**
 * Get all the tags linked to a project
 * @param {int} id The project id
 */
const getProjectTags = async (id) => {
	try {
		return await query(
			"SELECT Tags.id, Tags.text, Tags.color FROM Tags INNER JOIN ProjectsTags ON  ProjectsTags.tag_id = Tags.id WHERE ProjectsTags.project_id = ?",
			id
		);
	} catch (err) {
		throw err;
	}
};

/**
 * Removes a tag based on the provided id
 * @param {int} id
 */
const remove = async (id) => {
	try {
		const result = await query("DELETE FROM Tags WHERE id = ?", id);
		return result.affectedRows;
	} catch (err) {
		throw err;
	}
};

/**
 * Checks if a tag exists based off the text
 * @param {string} text The text of the tag to check
 */
const exists = async (text) => {
	try {
		const result = await query("SELECT id FROM Tags WHERE text = ?", text);
		return result;
	} catch (err) {
		throw err;
	}
};

module.exports = {
	gets,
	create,
	getProjectTags,
	remove,
	exists,
};
