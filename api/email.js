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
		var result = await emails.sendMail({ from: from, message: message, subject: subject });
		res.json({ sent: true });
	} catch (err) {
		log.error("/api/send-email", err);
		res.status(500).send();
	}
});

module.exports = router;

/*
app.post("/SendEmail", body.single(), (req, res) => {
	const message = {
		from: process.env.EMAIL_USER, // Sender address
		to: process.env.EMAIL_DEST, // List of recipients
		subject: req.body.subject, // Subject line
		text: "From: " + req.body.from + "\n" + req.body.msg, // Plain text body
	};

	//Send the message to my DEST EMAIL
	transport.sendMail(message, function (err, info) {
		if (err) {
			console.log(err);
			res.json({ status: "fail" });
		} else {
			console.log(info);
			SendConfirmationEmail(req);
			res.json({ status: "sent" });
		}
	});
});
*/
