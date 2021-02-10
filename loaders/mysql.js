const mysql = require("mysql");
var db;

function connectDatabase() {
	if (!db) {
		db = mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_DB,
		});

		db.connect(function (err) {
			if (err) {
				console.log("Error connecting database!");
			}
		});
	}
	return db;
}

module.exports = connectDatabase();
