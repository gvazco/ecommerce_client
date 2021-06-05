import { TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

export function setToken(token) {
	localStorage.setItem(TOKEN, token);
}

export function getToken() {
	return localStorage.getItem(TOKEN);
}

export function removeToken() {
	localStorage.removeItem(TOKEN);
}
