import "@testing-library/jest-dom";
import { testApiHandler } from "next-test-api-route-handler";
import route, { config } from "../../pages/api/logout";
import type { PageConfig } from "next";

const handler: typeof route & { config?: PageConfig } = route;
handler.config = config;

describe("test log out route", () => {
	it("should log out the user", async () => {
		await testApiHandler({
			requestPatcher: (req) => {
				req.url = "/api/logout";
			},
			handler,
			test: async ({ fetch }) => {
				const res = await fetch({
					method: "POST",
					headers: {
						"content-type": "application/json"
					}
				});
				const data = await res.json();
				expect(data).toStrictEqual({ message: "logged out" });
			}
		});
	});
});
