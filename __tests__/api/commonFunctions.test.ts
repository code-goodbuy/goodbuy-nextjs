import { APIHelper } from "../../lib/apiFunctions/commonFunctions";
import mock from "mock-http";
import { NextApiRequest } from "next";
import { expectCallWithoutRejection } from "../../lib/testUtils/testFunctions";

describe("Test the functions that make the proxy routes work", () => {
	let req: NextApiRequest,
		res: any,
		rej: any,
		resolve: any,
		token =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5OTk5OTk5OTksImVtYWlsIjoidGVzdEB0ZXN0LmNvIiwiaWF0IjoxNTE2MjM5MDIyfQ.JyrM7CQymsHChoqFcj_-VCJwn0mDQtN9r8jnEJ_TySw";

	let proxy = { web: jest.fn() };
	let API: APIHelper;

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

		proxy = { web: jest.fn() };

		//@ts-ignore: proxy type is not correct but it isn't a problem
		API = new APIHelper({ proxy, req, res, resolve, reject: rej });
		API.tokens = { "auth-token": "invalidToken", "refresh-token": "test" };
	});

	it("should reject the request", () => {
		// given + when
		API.rejectIfCondition(true);
		// then
		expect(rej).toHaveBeenCalled();
	});

	it("should not resolve the request", () => {
		// given + when
		API.resolveIfValid("auth-token", { message: "valid" });
		// then
		expect(resolve).not.toHaveBeenCalled();
	});

	it("should modify the request", () => {
		// given + when
		API.prepareForForwarding();
		// then
		expect(req.headers.cookie).toEqual("jid=test");
		expect(req.headers["auth-token"]).toEqual("invalidToken");
	});

	it("should forward a request", () => {
		// when
		API.forwardRequest(false);
		// then
		expectCallWithoutRejection(proxy.web, rej);
	});

	it("should handle the login", () => {
		// given
		res._internal.headers = { "set-cookie": `jid=${token}; other things;` };
		res._internal.body = `{"jwtAccessToken":"${token}"}`;
		// when
		API.handleLogin(res._internal.body, res._internal);
		// then
		expectCallWithoutRejection(resolve, rej);
	});

	it("should handle the token refresh", () => {
		// given
		res._internal.body = `{"jwtAccessToken":"${token}"}`;
		// when
		API.handleRefresh(res._internal.body);
		// then
		expectCallWithoutRejection(resolve, rej);
	});
});
