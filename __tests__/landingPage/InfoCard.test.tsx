import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import InfoCard, { getPartialNumber } from "../../components/landingPage/InfoCard";
import { InfoCardType } from "../../lib/types/HelperTypes";
import { expectAllToBeVisible } from "../../lib/testUtils/testFunctions";

describe("Test InfoCard", () => {
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
		// given + when
		const { getByText } = render(<InfoCard {...expectedProps} />);
		// then
		expectAllToBeVisible(
			[getPartialNumber(expectedProps.number) + " " + expectedProps.unit, expectedProps.text],
			getByText
		);
	});
});
