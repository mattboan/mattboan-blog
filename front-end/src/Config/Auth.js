import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const TOKEN_KEY = "TOKEN_KEY";

export const login = (token) => {
	console.log("Logged in!");
	Cookies.set(TOKEN_KEY, token);
};

export const logout = () => {
	console.log("Logged out!");
	Cookies.remove(TOKEN_KEY);
};

export const isLogin = () => {
	let cookie = getToken();

	if (!cookie) {
		console.log("!cookie");
		return false;
	}
	let exp = jwt_decode(cookie).exp * 1000;
	console.log("cookie: " + new Date(exp).toString());
	console.log("now: " + new Date(Date.now()).toString());

	if (exp < Date.now()) {
		console.log("data comp!");
		return false;
	}

	return true;
};

export const getToken = () => {
	return Cookies.get(TOKEN_KEY);
};
