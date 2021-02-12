"use strict";
require("dotenv").config();

const express = require("express");
const loaders = require("./loaders");
const http = require("http");
const https = require("https");
const cert = require("./config/cert");

async function startServer() {
	const app = express();

	await loaders(app);

	try {
		var httpServer = https.http.createServer(app);
		var httpsServer = https.https.createServer(cert.credentials, app);

		httpServer.listen(80);
		httpsServer.listen(443);
	} catch (err) {
		console.log("Error: " + err);
	}
}

startServer();
