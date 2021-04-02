import "@testing-library/jest-dom";
import { testApiHandler } from "next-test-api-route-handler";
import route, { config } from "../../pages/api/logout";
import type { PageConfig } from "next";
import mock from "mock-http";

const handler: typeof route & { config?: PageConfig } = route;
handler.config = config;

describe("test log out route", () => {
	it("should log out the user", async () => {
		await testApiHandler({
			handler,
			requestPatcher: (req) => new mock.Request(),
			test: async ({ fetch }) => {
				const res = await fetch({ method: "POST" });
				const data = await res.json();
				expect(data).toStrictEqual({ message: "logged out" });
			}
		});
	});
});
