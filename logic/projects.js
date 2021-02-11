const mysql = require("../loaders/mysql");
const util = require("util");

const query = util.promisify(mysql.query).bind(mysql);

const gets = async () => {
	try {
		return await query("SELECT * FROM Projects");
	} catch (err) {
		throw err;
	}
};

const get = async (id) => {
	try {
		return await query("SELECT * FROM Projects WHERE id = ?", id);
	} catch (err) {
		throw err;
	}
};

const getWithQuery = async (projectQuery) => {
	try {
		return await query(
			"SELECT * FROM Projects WHERE MATCH(name, description) against (? IN BOOLEAN MODE)",
			projectQuery
		);
	} catch (err) {
		throw err;
	}
};

const getWithTag = async (id) => {
	try {
		return await query(
			"SELECT * FROM Projects WHERE id = (SELECT ProjectsTags.project_id FROM ProjectsTags WHERE ProjectsTags.tag_id = ?)",
			id
		);
	} catch (err) {
		throw err;
	}
};

const create = async () => {
	try {
		const result = await query("INSERT INTO Projects () VALUES ()");
		return result.insertId;
	} catch (err) {
		throw err;
	}
};

const edit = async (project) => {
	try {
		var post = JSON.stringify(project.post);
		const result = await query(
			"UPDATE Projects SET name = ?, description = ?, image = ?, post = ? WHERE id = ?",
			[project.name, project.description, project.image, post, project.id]
		);
		return result.affectedRows;
	} catch (err) {
		throw err;
	}
};

const remove = async (id) => {
	try {
		const result = await query("DELETE FROM Projects WHERE id = ?", id);
		return result.affectedRows;
	} catch (err) {
		throw err;
	}
};

module.exports = {
	gets,
	get,
	getWithTag,
	getWithQuery,
	create,
	edit,
	remove,
};
