const expressLoader = require("./express");
const colors = require("colors");

function inited(module) {
	console.log("✅ Initialized: " + module.green);
}

function notinited(module) {
	console.log("❌ Failed to initialize: " + module.red);
}

module.exports = async (app) => {
	console.log("Initiating Express");
	//Try to initialize express
	try {
		await expressLoader(app);
		inited("Express");
	} catch (err) {
		notinited("Express");
	}
};
