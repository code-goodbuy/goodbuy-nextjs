import { render, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../../components/common/Header";

describe("Test the Header", () => {
	it("should change the color mode", async () => {
		// given
		const { getByTestId } = render(<Header />);
		const switcher = getByTestId("colorSwitcher");
		// when
		await act(async () => {
			fireEvent.click(switcher);
		});
		// then
		expect(switcher).toHaveTextContent("Switch to Dark Theme");
	});
});
