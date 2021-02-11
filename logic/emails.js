const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

//Setup a transporter
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		type: "OAuth2",
		user: process.env.EMAIL_USER,
		clientId: process.env.EMAIL_ID,
		clientSecret: process.env.EMAIL_SECRET,
		refreshToken: process.env.EMAIL_REF_TOK,
	},
});

const sendMail = async (options) => {
	const message = {
		from: process.env.EMAIL_USER, // Sender address
		to: process.env.EMAIL_DEST, // List of recipients
		subject: options.subject, // Subject line
		text: "From: " + options.from + "\n" + options.message, // Plain text body
	};

	// send mail with defined transport object
	try {
		var info = await transporter.sendMail(message);
	} catch (err) {
		throw err;
	}

	return info;
};

module.exports = {
	sendMail,
};
