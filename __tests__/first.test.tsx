import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import LandingPage from "../components/landingPage/LandingPage";

describe("Load landing page", () => {
	it("Should render the 2 elements", () => {
		const { getByText } = render(<LandingPage />);

		const header = getByText("Hello, Welcome to GoodBuy");
		const paragraph = getByText("It looks empty now but it won't in the future 😀");

		expect(header).toBeVisible();
		expect(paragraph).toBeVisible();
	});
});
