import React from "react";
import "./ContactMe.css";
import BigButton from "./BigButton";

class ContactMe extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="ContactMe">
				<h3>Contact Me</h3>
				<div className="ContactMeForm">
					<label>Email:</label>
					<input placeholder="example@example.com"></input>
					<label>Message:</label>
					<textarea
						rows="5"
						placeholder="Ask me anything..."></textarea>
					<BigButton
						text="Send Message!"
						primary_color="#FFFFFF"
						accent_color="#dd5405"
						shadow="false"
					/>
				</div>
			</div>
		);
	}
}

export default ContactMe;
