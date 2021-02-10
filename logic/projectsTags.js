const mysql = require("../loaders/mysql");
const util = require("util");

const query = util.promisify(mysql.query).bind(mysql);

/**
 * Get all the tags from the database
 * @TODO - Limit this response to a number of tags
 */
const exists = async (tag_id, project_id) => {
	try {
		var result = await query(
			"SELECT tag_id FROM ProjectsTags WHERE tag_id = ? AND project_id = ?",
			[tag_id, project_id]
		);
		return result.length;
	} catch (err) {
		throw err;
	}
};
/**
 * Create a new ProjectsTags record
 */
const create = async (tag_id, project_id) => {
	try {
		let result = await query("INSERT INTO ProjectsTags (tag_id, project_id) VALUES (?, ?)", [
			tag_id,
			project_id,
		]);
		return result.affectedRows;
	} catch (err) {
		throw err;
	}
};

const remove = async (tag_id, project_id) => {
	try {
		let result = await query("DELETE FROM ProjectsTags WHERE tag_id = ? AND project_id = ?", [
			tag_id,
			project_id,
		]);
		return result.affectedRows;
	} catch (err) {
		throw err;
	}
};

module.exports = {
	exists,
	create,
	remove,
};
