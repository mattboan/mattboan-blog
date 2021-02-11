const mysql = require("../loaders/mysql");
const util = require("util");

const query = util.promisify(mysql.query).bind(mysql);

/**
 * Get all the tags from the database
 * @TODO - Limit this response to a number of tags
 */
const exists = async (tag_id, project_id) => {
	const returnResult = {
		passed_tag_id: tag_id,
		passed_project_id: project_id,
		id: 0,
		tag_id: 0,
	};

	try {
		var result = await query(
			"SELECT DISTINCT id, tag_id FROM ProjectsTags WHERE tag_id = ? AND project_id = ?",
			[tag_id, project_id]
		);

		if (result[0]) {
			(returnResult.id = result[0].id), (returnResult.tag_id = result[0].tag_id);
		}

		return returnResult;
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
