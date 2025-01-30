import {  LoginResponse } from "../responses";

const LOCALSTORAGE_USERKEY = "user_login_response";

function createUserId(value: LoginResponse): void {
	localStorage.setItem(LOCALSTORAGE_USERKEY, JSON.stringify(value));
}

function getUserId(): LoginResponse | null {
	const storedValue = localStorage.getItem(LOCALSTORAGE_USERKEY);
	if (storedValue === null) {
		return null;
	} else {
		return JSON.parse(storedValue) as LoginResponse;
	}
}

function removeUserId(): void {
	localStorage.removeItem(LOCALSTORAGE_USERKEY);
	window.location.reload();
}

interface CookieManager {
	createUser: (value: LoginResponse) => void;
	getUser: () => LoginResponse | null;
	removeUser: () => void;
}

export default function useCookies(): CookieManager {
	return {
		createUser: (value: LoginResponse) => createUserId(value),
		getUser: () => getUserId(),
		removeUser: () => removeUserId(),
	} as CookieManager;
}
