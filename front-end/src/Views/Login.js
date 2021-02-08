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
		console.log("Login Called!");
		alert(this.state.username);
		alert(this.state.password);
		let form = new FormData();

		form.append("username", this.state.username);
		form.append("password", this.state.password);

		axios({
			method: "post",
			url: API.backend + "/Login",
			data: form,
			headers: { "Content-Type": "multipart/form-data" },
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
					<input
						value={this.state.username}
						onChange={this.handleUsernameChange}></input>
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
