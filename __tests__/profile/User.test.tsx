import { Matcher, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import User from "../../pages/user/[username]";

function expectAllToBeVisible(elements: string[], selector: (text: Matcher) => HTMLElement) {
	for (let e of elements) {
		expect(selector(e)).toBeVisible();
	}
}

const useRouter = jest.spyOn(require("next/router"), "useRouter");

useRouter.mockImplementation(() => ({
	route: "",
	basePath: "",
	pathname: "/",
	query: {},
	asPath: "",
	push: async () => true,
	replace: async () => true,
	reload: () => null,
	back: () => null,
	prefetch: async () => undefined,
	beforePopState: () => null,
	isFallback: false,
	events: {
		on: () => null,
		off: () => null,
		emit: () => null
	}
}));

describe("Test profile page", () => {
	it("Should render the informations properly", () => {
		// given + when
		const { getByTestId, getByText } = render(
			<User
				username="test"
				data={{
					followers: 50,
					following: 70,
					scannedProducts: 30,
					description: "I like using goodbuy",
					imageURL: "/public/pics/face.png",
					listOfScanned: [{ title: "Coca Cola", EAN: "5000112581508", country: "United Kingdom", likes: 6 }]
				}}
			></User>
		);
		// then
		expectAllToBeVisible(["username", "profile-pic", "description"], getByTestId);
		expectAllToBeVisible(["30", "50", "70", "Follow", "Coca Cola"], getByText);
	});
});
