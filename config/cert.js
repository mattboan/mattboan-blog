const fs = require("fs");
require("dotenv").config();

const privateKey = fs.readFileSync(process.env.PRIVATE_KEY, "utf8");
const certificate = fs.readFileSync(process.env.CERT, "utf8");
const ca = fs.readFileSync(process.env.CA, "utf8");

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca,
};

module.exports = {
	credentials,
};
