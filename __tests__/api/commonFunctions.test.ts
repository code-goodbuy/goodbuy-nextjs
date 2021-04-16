import { rejectIfCondition, resolveIfValid, prepareForForwarding } from "../../lib/apiFunctions/commonFunctions";
import mock from "mock-http";
import { IncomingMessage } from "node:http";

describe("Test the functions that make the proxy work", () => {
	let req: IncomingMessage, res: any, token: string;

	let mockGetCookie = jest.fn((name) => name);
	let mockSetCookie = jest.fn();

	jest.mock("cookies", () => {
		return jest.fn().mockImplementation(() => ({
			set: mockSetCookie,
			get: mockGetCookie
		}));
	});

	beforeEach(() => {
		req = new mock.Request({
			url: "/test",
			method: "POST",
			buffer: Buffer.from("name=mock&version=first")
		});
		res = new mock.Response({});
		res.status = jest.fn(() => ({ "json": jest.fn() }));
	});

	it("should reject the request", () => {
		const rej = jest.fn();
		// @ts-ignore: res doens't match the exact type but has all the required properties
		rejectIfCondition(res, rej, true);
		expect(rej).toHaveBeenCalled();
	});

	it("should not resolve the request", () => {
		const resolve = jest.fn();
		resolveIfValid({ token: "invalidToken", response: res, resolve, message: "test" });
		expect(resolve).not.toHaveBeenCalled();
	});

	it("should modify the request", () => {
		const temp = Object.assign(req, { "cookies": {}, "query": {}, "body": {}, "env": {} });
		prepareForForwarding({ req: temp, cookie: "test-cookie", token: "test-token" });
		expect(temp.headers.cookie).toEqual("test-cookie");
		expect(temp.headers["auth-token"]).toEqual("test-token");
	});
});
