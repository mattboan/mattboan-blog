import React from "react";
import axios from "axios";

//Styles
import "./Styles/Login.css";

//Config
import API from "../Config/URL";
import { login, logout } from "../Config/Auth";

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			username: "",
			password: "",
			status: "",
		};
	}

	handleUsernameChange = (e) => {
		this.setState({ username: e.target.value });
	};

	handlePasswordChange = (e) => {
		this.setState({ password: e.target.value });
	};

	loginAPI = (e) => {
		e.preventDefault();
		logout();

		const params = new URLSearchParams();
		params.append("username", this.state.username);
		params.append("password", this.state.password);

		axios({
			method: "post",
			url: API.backend + "/api/login-user",
			data: params,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		})
			.then(function (res) {
				console.log(res);
				login(res.data.token);
			})
			.catch(function (err) {
				console.log(err);
			});
	};

	render() {
		return (
			<div className="Login">
				<h3>Login</h3>
				<form onSubmit={this.loginAPI}>
					<label>Username</label>
					<input value={this.state.username} onChange={this.handleUsernameChange}></input>
					<label>Password</label>
					<input
						type="password"
						value={this.state.password}
						onChange={this.handlePasswordChange}></input>
					<div className="onSubmitRow">
						<p>{this.state.status}</p>
						<button type="submit">Login</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Login;
