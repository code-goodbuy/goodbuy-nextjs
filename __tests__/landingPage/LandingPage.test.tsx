import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import LandingPage from "../../components/landingPage/LandingPage";

describe("Test landing page", () => {
	it("shouhld render the titles", async () => {
		const { getByTestId, getByText } = render(<LandingPage />);
		const mainTitle = getByTestId("main-title");
		const missionTitle = getByTestId("mission-title");
		const btn = getByText("Start Now");

		expect(mainTitle).toBeVisible();
		expect(missionTitle).toBeVisible();
		expect(btn).toBeVisible;
	});
});
