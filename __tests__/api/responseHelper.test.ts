import Cookies from "cookies";
import mock from "mock-http";
import { IncomingMessage, ServerResponse } from "node:http";
import {
	setTokenCookie,
	getTokenFromCookie,
	getTokenFromResponse,
	initCookies
} from "../../lib/apiFunctions/responseHelpers";

let mockGetCookie = jest.fn();
let mockSetCookie = jest.fn();

jest.mock("cookies", () => {
	return jest.fn().mockImplementation(() => ({
		set: mockSetCookie,
		get: mockGetCookie
	}));
});

describe("Test cookies helper functions", () => {
	let req: IncomingMessage, res: ServerResponse, token: string, cookie: Cookies;

	beforeEach(() => {
		req = new mock.Request({
			url: "/test",
			method: "POST",
			buffer: Buffer.from("name=mock&version=first")
		});
		res = new mock.Response({});
		token =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODk5MzkwMjIsImVtYWlsIjoidGVzdEB0ZXN0LmNvIiwiaWF0IjoxNTE2MjM5MDIyfQ.tEc3R_z-7oJxJVYtNeic5xkBOmQZJx9aF9fOpBf6JVU";
		cookie = initCookies(req, res);
	});

	it("should set a new cookie", () => {
		setTokenCookie(cookie, "auth-token", token);
		expect(mockSetCookie).toHaveBeenCalledWith("auth-token", token, { "httpOnly": true, "sameSite": "lax" });
	});

	it("shohuld get a cookie", () => {
		getTokenFromCookie(cookie, "auth-token");
		expect(mockGetCookie).toHaveBeenCalled();
	});

	it("should get a token from a response", () => {
		const output = getTokenFromResponse(`{"jwtAccessToken":"${token}"}`);
		expect(output).toBe(token);
	});
});
