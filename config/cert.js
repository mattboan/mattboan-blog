const fs = require("fs");
require("dotenv").config();

var privateKey = "";
var certificate = "";
var ca = "";

try {
	privateKey = fs.readFileSync(process.env.PRIVATE_KEY, "utf8");
	certificate = fs.readFileSync(process.env.CERT, "utf8");
	ca = fs.readFileSync(process.env.CA, "utf8");
} catch (err) {
	console.log("Error loading the cretificate credentials! - " + err);
}

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca,
};

module.exports = {
	credentials,
};
