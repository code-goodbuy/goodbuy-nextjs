import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import InfoCard, { getPartialNumber } from "../../components/landingPage/InfoCard";
import { InfoCardType } from "../../lib/types/HelperTypes";

describe("Test InfoCard", () => {
	/**
	 * check for correct behavior of the infocard component
	 */
	let expectedProps: InfoCardType;

	beforeEach(() => {
		expectedProps = {
			number: 365,
			unit: "days",
			text: "passed since the beginning of the year",
			url: ""
		};
	});

	it("should display the correct number of days passed", async () => {
		const { getByText } = render(<InfoCard {...expectedProps} />);
		const title = getByText(getPartialNumber(expectedProps.number) + " " + expectedProps.unit);
		const text = getByText(expectedProps.text);

		expect(title).toBeVisible();
		expect(text).toBeVisible();
	});
});
