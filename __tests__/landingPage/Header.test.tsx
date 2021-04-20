import { render, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../../components/common/Header";

describe("Test the Header", () => {
	it("should change the color mode", async () => {
		const { getByTestId } = render(<Header />);
		const switcher = getByTestId("colorSwitcher");
		await act(async () => {
			fireEvent.click(switcher);
		});
		expect(switcher).toHaveTextContent("Switch to Dark Theme");
	});
});
