const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const history = require("connect-history-api-fallback");
const cors = require("cors");
const path = require("path");
const url = require("../config/URL");
const projectRoutes = require("../api/projects");
const tagRoutes = require("../api/tags");
const projectsTagsRoutes = require("../api/projectsTags");
const usersRoutes = require("../api/users");
const dotenv = require("dotenv").config();

function added(module) {
	console.log("\t✅ " + module.green);
}

function notadded(module) {
	console.log("\t❌ " + module.red);
}

module.exports = async (app) => {
	app.use(history({ verbose: false }));
	app.use(bodyParser.urlencoded({ extended: true }));
	//use cors to allow cross origin resource sharing
	app.use(cors({ origin: url.frontend, credentials: true }));

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

	//Handle Projects Tags Routes
	try {
		app.use(projectsTagsRoutes);
		added("ProjectsTags Routes");
	} catch (err) {
		notadded("Projects Tags Routes");
	}

	//Handle Users Routes
	try {
		app.use(usersRoutes);
		added("Users Routes");
	} catch (err) {
		notadded("Users Routes");
	}

	try {
		//Allow static access to the front-end
		app.use(express.static(`${process.env.PROJ_PATH}/front-end/build`));
		//Express middleware
		app.use(cookieParser());
		app.use(express.static(process.env.PROJ_PATH + "/pics"));
		app.use("/uploads", express.static(process.env.PROJ_PATH + "/uploads"));
		app.use("/images", express.static(process.env.PROJ_PATH + "/images"));

		added("Middleware");
	} catch (err) {
		notadded("Middleware");
	}

	return app;
};
