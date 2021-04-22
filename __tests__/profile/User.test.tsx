import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import User from "../../pages/user/[username]";

describe("Test profile page", () => {
	it("Should render the informations properly", () => {
		const { getByText, getByTestId } = render(
			<User
				username="test"
				data={{
					followers: "50",
					following: "70",
					scannedProducts: "30",
					userID: "mockUserId",
					description: "I like using goodbuy",
					imageURL: "/public/pics/face.png",
					listOfScanned: [{ title: "Coca Cola", EAN: "5000112581508", country: "United Kingdom" }]
				}}
			></User>
		);

		const username = getByTestId("username");
		const scanned = getByText("30");
		const followers = getByText("50");
		const following = getByText("70");
		const image = getByTestId("profile-pic");
		const description = getByTestId("description");
		const follow = getByText("Follow");
		const product = getByText("Coca Cola");

		expect(username).toBeVisible();
		expect(scanned).toBeVisible();
		expect(followers).toBeVisible();
		expect(following).toBeVisible();
		expect(image).toBeVisible();
		expect(description).toBeVisible();
		expect(follow).toBeVisible();
		expect(product).toBeVisible();
	});
});
