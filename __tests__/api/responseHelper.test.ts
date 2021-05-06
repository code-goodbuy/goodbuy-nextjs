import Cookies from "cookies";
import mock from "mock-http";
import { IncomingMessage, ServerResponse } from "node:http";
import { CookieHelper, getTokenFromResponse, getTokenFromResponseCookie } from "../../lib/apiFunctions/responseHelpers";

let mockGetCookie = jest.fn();
let mockSetCookie = jest.fn();

jest.mock("cookies", () => {
	return jest.fn().mockImplementation(() => ({
		set: mockSetCookie,
		get: mockGetCookie
	}));
});

describe("Test cookies helper functions", () => {
	let req: IncomingMessage, res: ServerResponse, token: string, cookie: any;

	beforeEach(() => {
		req = new mock.Request({
			url: "/test",
			method: "POST",
			buffer: Buffer.from("name=mock&version=first")
		});
		res = new mock.Response({});
		token =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjkwODk5MzkwMjIsImVtYWlsIjoidGVzdEB0ZXN0LmNvIiwiaWF0IjoxNTE2MjM5MDIyfQ.5vHpQeDVhDFBApJ0cfGODfpt91Wv-7My2hJrxdRulNs";
		cookie = new CookieHelper(req, res);
	});

	it("should set a new cookie", () => {
		// given + when
		cookie.setToken("auth-token", token);
		// then
		expect(mockSetCookie).toHaveBeenCalledWith("auth-token", token, { "httpOnly": true, "sameSite": "lax" });
	});

	it("shohuld get a cookie", () => {
		// given + when
		cookie.getToken("auth-token");
		// then
		expect(mockGetCookie).toHaveBeenCalled();
	});

	it("should get a token from a response", () => {
		// given + when
		const output = getTokenFromResponse(`{"jwtAccessToken":"${token}"}`);
		// then
		expect(output).toBe(token);
	});

	it("should set a token from cookie", () => {
		//given
		const response = new mock.Response();
		response._internal.headers = { "set-cookie": `jid=${token}; other things;` };
		// when
		// @ts-ignore: Not a proper response type but this has all the needed properties
		const output = getTokenFromResponseCookie(response._internal);
		// then
		expect(output).toBe(token);
	});
});
