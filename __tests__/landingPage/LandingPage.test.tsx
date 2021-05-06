import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import LandingPage from "../../components/landingPage/LandingPage";
import { expectAllToBeVisible } from "../../lib/testUtils/testFunctions";

describe("Test landing page", () => {
	it("shouhld render the titles", async () => {
		// given + when
		const { getByTestId, getByText } = render(<LandingPage />);
		//then
		expectAllToBeVisible(["main-title", "mission-title", "about-title"], getByTestId);
		expect(getByText("Start Now")).toBeVisible();
	});
});
