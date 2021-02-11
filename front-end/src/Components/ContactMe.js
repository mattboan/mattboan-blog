import React from "react";
import axios from "axios";
import DotLoader from "react-spinners/DotLoader";
import BigButton from "./BigButton";

//Styles
import "./Styles/ContactMe.css";

//Config
import API from "../Config/URL";
import dotConfig from "../Config/DotConfig";

const override = `
    display: block;
    margin: 0;
    margin-top: 0px;
    margin-bottom: 0px;
	margin-right: 5px;
    border-color: red;
`;

class ContactMe extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			subject: "",
			message: "",
			sending: false,
			status: "",
		};
	}

	handleEmailChange = (e) => {
		this.setState({ email: e.target.value });
	};

	handleSubjectChange = (e) => {
		this.setState({ subject: e.target.value });
	};

	handleMessageChange = (e) => {
		this.setState({ message: e.target.value });
	};

	//TODO: Add an axios request to send a form to the backend to then send an email.
	sendEmail = () => {
		this.setState({ sending: true });
		console.log("sendEmail called");

		const params = new URLSearchParams();
		params.append("from", this.state.email);
		params.append("subject", this.state.subject);
		params.append("message", this.state.message);

		//First check if tag exists
		axios({
			method: "post",
			url: API.backend + "/api/send-email",
			data: params,
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		})
			.then((res) => {
				console.log(res.data);
				this.setState({ sending: false, status: "Message Sent!" });
			})
			.catch((err) => {
				console.log(err);
				this.setState({ sending: false, status: "Error Sending!" });
			});
	};

	render() {
		return (
			<div className="ContactMe">
				<h3>Contact Me</h3>
				<div className="ContactMeForm">
					<label>Email</label>
					<input
						value={this.state.email}
						placeholder="example@example.com"
						onChange={this.handleEmailChange}></input>
					<label>Subject</label>
					<input
						value={this.state.subject}
						placeholder="The Subject of the Email"
						onChange={this.handleSubjectChange}></input>
					<label>Message</label>
					<textarea
						value={this.state.message}
						rows="5"
						placeholder="Ask me anything..."
						onChange={this.handleMessageChange}></textarea>
					<div className="buttonAndStatus">
						{(() => {
							if (this.state.sending)
								return <DotLoader css={override} size={25} color={"#ffffff"} />;
							else return <p>{this.state.status}</p>;
						})()}
						<button onClick={this.sendEmail}>Send!</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ContactMe;
