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
		const result = await query(
			"UPDATE Projects SET name = ?, description = ?, image = ?, post = ? WHERE id = ?",
			[project.name, project.description, project.image, project.post, project.id]
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
	create,
	edit,
	remove,
};
