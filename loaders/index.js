const expressLoader = require("./express");
const colors = require("colors");

function initing(module) {
	console.log("⏳ Initiating: " + module);
}

function inited(module) {
	console.log("✅ Initialized: " + module.green);
}

function notinited(module) {
	console.log("❌ Failed to initialize: " + module.red);
}

module.exports = async (app) => {
	//Try to initialize express
	try {
		initing("Express");
		await expressLoader(app);
		inited("Express");
	} catch (err) {
		notinited("Express");
	}
};
