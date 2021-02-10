const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const history = require("connect-history-api-fallback");
const cors = require("cors");
const url = require("../config/URL");
const projectRoutes = require("../api/projects");
const tagRoutes = require("../api/tags");
const projectsTagsRoutes = require("../api/projectsTags");

function added(module) {
	console.log("\t✅ " + module.green);
}

function notadded(module) {
	console.log("\t❌ " + module.red);
}

module.exports = async (app) => {
	app.use(bodyParser.urlencoded({ extended: true }));

	//Handle Project Routes
	try {
		app.use(projectRoutes);
		added("Project Routes");
	} catch (err) {
		notadded("Project Routes");
	}

	//Handle Tags Routes
	try {
		app.use(tagRoutes);
		added("Tag Routes");
	} catch (err) {
		notadded("Tag Routes");
	}

	//Handle Projects Tags
	try {
		app.use(projectsTagsRoutes);
		added("ProjectsTags Routes");
	} catch (err) {
		notadded("Projects Tags Routes");
	}

	try {
		//Express middleware
		app.use(cookieParser());
		app.use("/uploads", express.static(__dirname + "/uploads"));
		app.use("/images", express.static(__dirname + "/images"));
		app.use(history({ verbose: false }));

		//use cors to allow cross origin resource sharing
		app.use(cors({ origin: url.frontend, credentials: true }));

		//Allow static access to the front-end
		app.use(express.static(`${__dirname}/front-end/build`));

		added("Middleware");
	} catch (err) {
		notadded("Middleware");
	}

	return app;
};
