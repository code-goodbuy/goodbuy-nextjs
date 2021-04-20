import {
	rejectIfCondition,
	resolveIfValid,
	prepareForForwarding,
	forwardRequest,
	handleLogin,
	handleRefresh
} from "../../lib/apiFunctions/commonFunctions";
import mock from "mock-http";
import { NextApiRequest } from "next";

describe("Test the functions that make the proxy work", () => {
	let req: NextApiRequest,
		res: any,
		rej: any,
		resolve: any,
		token =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5OTk5OTk5OTksImVtYWlsIjoidGVzdEB0ZXN0LmNvIiwiaWF0IjoxNTE2MjM5MDIyfQ.JyrM7CQymsHChoqFcj_-VCJwn0mDQtN9r8jnEJ_TySw";

	let mockGetCookie = jest.fn((name) => name);
	let mockSetCookie = jest.fn();

	jest.mock("cookies", () => {
		return jest.fn().mockImplementation(() => ({
			set: mockSetCookie,
			get: mockGetCookie
		}));
	});

	beforeEach(() => {
		const temp = new mock.Request({
			url: "/test",
			method: "POST",
			buffer: Buffer.from("name=mock&version=first")
		});
		req = Object.assign(temp, { "cookies": {}, "query": {}, "body": {}, "env": {} });
		res = new mock.Response({});
		res.status = jest.fn(() => ({ "json": jest.fn() }));
		rej = jest.fn();
		resolve = jest.fn();
	});

	it("should reject the request", () => {
		// @ts-ignore: res doens't match the exact type but has all the required properties
		rejectIfCondition(res, rej, true);
		expect(rej).toHaveBeenCalled();
	});

	it("should not resolve the request", () => {
		resolveIfValid({ token: "invalidToken", response: res, resolve, message: "test" });
		expect(resolve).not.toHaveBeenCalled();
	});

	it("should modify the request", () => {
		prepareForForwarding({ req, cookie: "test-cookie", token: "test-token" });
		expect(req.headers.cookie).toEqual("test-cookie");
		expect(req.headers["auth-token"]).toEqual("test-token");
	});

	it("should forward a request", () => {
		const proxy = { web: jest.fn() };
		// @ts-ignore; proxy type is not exactly the same
		forwardRequest({ res, res, proxy, handleRes: false, reject: rej });
		expect(proxy.web).toHaveBeenCalled();
		expect(rej).not.toHaveBeenCalled();
	});

	it("should handle the login", () => {
		res._internal.headers = { "set-cookie": `jid=${token}; other things;` };
		res._internal.body = `{"jwtAccessToken":"${token}"}`;
		handleLogin({ req, res, proxyRes: res._internal, body: res._internal.body, resolve, reject: rej });
		expect(resolve).toHaveBeenCalled();
		expect(rej).not.toHaveBeenCalled();
	});

	it("should handle the token refresh", () => {
		res._internal.body = `{"jwtAccessToken":"${token}"}`;
		handleRefresh({ req, res, body: res._internal.body, resolve, reject: rej });
		expect(resolve).toHaveBeenCalled();
		expect(rej).not.toHaveBeenCalled();
	});
});
