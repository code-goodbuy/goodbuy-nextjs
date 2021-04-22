import "@testing-library/jest-dom";
import { testApiHandler } from "next-test-api-route-handler";
import logout from "../../pages/api/logout";
import check from "../../pages/api/check";
import { apiConfig as config } from "../../lib/apiFunctions/apiConfig";
import type { PageConfig } from "next";

let handler: typeof logout & { config?: PageConfig } = logout;
handler.config = config;

async function testRoute(route: any, url: string, message: string) {
	handler = route;
	handler.config = config;

	await testApiHandler({
		requestPatcher: (req) => {
			req.url = url;
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
			expect(data).toStrictEqual({ message: message });
		}
	});
}

describe("test routes", () => {
	it("should log out the user", async () => {
		await testRoute(logout, "/api/logout", "logged out");
	});

	it("should check the user logged in state", async () => {
		await testRoute(check, "/api/check", "not logged");
	});
});
