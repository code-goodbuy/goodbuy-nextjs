import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import User from "../../pages/user/[username]";

describe("Test profile page", () => {
	it("Should render the informations properly", () => {
		const { getByText } = render(<User username="test"></User>);

		const username = getByText("test");
		const scanned = getByText("Scanned: 30");
		const followers = getByText("Followers: 50");
		const following = getByText("Following: 70");

		expect(username).toBeVisible();
		expect(scanned).toBeVisible();
		expect(followers).toBeVisible();
		expect(following).toBeVisible();
	});
});
