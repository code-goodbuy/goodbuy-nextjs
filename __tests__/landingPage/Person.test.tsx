import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Person from "../../components/landingPage/Person";
import { PersonType } from "../../lib/types/HelperTypes";
import { expectAllToBeVisible } from "../../lib/testUtils/testFunctions";

describe("Test Person Component", () => {
	let expectedProps: PersonType;

	beforeEach(() => {
		expectedProps = {
			fullName: "John Doe",
			role: "VP of Engineering",
			path: "/pics/face.png",
			url: ""
		};
	});

	it("should display the correct person", async () => {
		// given + when
		const { getByText } = render(<Person {...expectedProps} />);
		// then
		expectAllToBeVisible([expectedProps.fullName, expectedProps.role], getByText);
	});
});
