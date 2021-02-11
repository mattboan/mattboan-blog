import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const TOKEN_KEY = "TOKEN_KEY";

export const login = (token) => {
	Cookies.set(TOKEN_KEY, token);
};

export const logout = () => {
	Cookies.remove(TOKEN_KEY);
};

export const isLogin = () => {
	let cookie = getToken();

	if (!cookie) {
		return false;
	}
	let exp = jwt_decode(cookie).exp * 1000;

	if (exp < Date.now()) {
		return false;
	}

	return true;
};

export const getToken = () => {
	return Cookies.get(TOKEN_KEY);
};
