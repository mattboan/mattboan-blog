const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const history = require("connect-history-api-fallback");
const cors = require("cors");
const url = require("../config/URL");
const projectRoutes = require("../api/project");

function added(module) {
	console.log("\t✅ " + module.green);
}

function notadded(module) {
	console.log("\t❌ " + module.red);
}

module.exports = async (app) => {
	//Handle routes
	try {
		app.use(projectRoutes);
		added("Project Routes");
	} catch (err) {
		notadded("Project Routes");
	}

	try {
		//Express middleware
		app.use(cookieParser());
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use("/uploads", express.static(__dirname + "/uploads"));
		app.use("/images", express.static(__dirname + "/images"));
		app.use(history({ verbose: false }));

		//use cors to allow cross origin resource sharing
		app.use(cors({ origin: url.frontend, credentials: true }));

		//Allow static access to the front-end
		app.use(express.static(`${__dirname}/build`));

		added("Middleware");
	} catch (err) {
		notadded("Middleware");
	}

	return app;
};
