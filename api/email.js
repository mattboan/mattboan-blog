const express = require("express");
const log = require("../logs/routes");
const emails = require("../logic/emails");
const router = express.Router();

router.post("/api/send-email", async (req, res) => {
	log.route("/api/send-email");

	//Try to parse the request variables
	try {
		var from = req.body.from;
		var message = req.body.message;
		var subject = req.body.subject;
		if (!from || !message || !subject) throw "Invlid inputs!";
	} catch (err) {
		log.error("/api/send-email", err);
		return res.status(400).send(); //This needs to be returned to stop further execution
	}

	try {
		await emails.sendMail({ from: from, message: message, subject: subject });
		await emails.sendConfirmationEmail(from);
		res.json({ sent: true });
	} catch (err) {
		log.error("/api/send-email", err);
		res.status(500).send();
	}
});

module.exports = router;
