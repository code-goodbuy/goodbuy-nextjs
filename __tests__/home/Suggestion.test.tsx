import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Suggestion from "../../components/home/Suggestion";
import { expectAllToBeVisible } from "../../lib/testUtils/testFunctions";

describe("Test the suggestion component", () => {
	const props = {
		imageURL: "/api/face.png",
		scannedProducts: 28,
		username: "username"
	};

	it("should display the props", () => {
		// given + when
		const { getByText } = render(<Suggestion {...props} />);
		// then
		expectAllToBeVisible([props.scannedProducts.toString() + " Products", props.username], getByText);
	});
});
