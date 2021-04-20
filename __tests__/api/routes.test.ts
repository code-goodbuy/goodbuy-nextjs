import "@testing-library/jest-dom";
import { testApiHandler } from "next-test-api-route-handler";
import logout from "../../pages/api/logout";
import check from "../../pages/api/check";
import { apiConfig as config } from "../../lib/apiFunctions/apiConfig";
import type { PageConfig } from "next";

let handler: typeof logout & { config?: PageConfig } = logout;
handler.config = config;

async function testRoute(route: any, url: string, tests: any) {
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
			tests(data);
		}
	});
}

describe("test routes", () => {
	it("should log out the user", async () => {
		const tests = (data: any) => {
			expect(data).toStrictEqual({ message: "logged out" });
		};
		await testRoute(logout, "/api/logout", tests);
	});

	it("should check the user logged in state", async () => {
		const tests = (data: any) => {
			expect(data).toStrictEqual({ message: "not logged" });
		};
		await testRoute(check, "/api/check", tests);
	});
});
