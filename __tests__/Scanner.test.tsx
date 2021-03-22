import { render, act, fireEvent, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../components/common/Header";
import ScannerPage from "../components/utility/Scanner";

describe("Test ScannerPage", () => {
  it("should have a scanner page link", async () => {
    const { getByTestId } = render(<Header />);
    const scannerButton = getByTestId("scannerPage");
    await act(async () => {
      fireEvent.click(scannerButton);
    });
    expect(scannerButton).toHaveTextContent("Scanner");
  });
});

