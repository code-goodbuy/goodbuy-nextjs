import { render, act, fireEvent, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../components/common/Header";
import ScannerPage from "../components/utility/Scanner";

describe("Test ScannerPage", () => {
  it("should have a scanner page link", () => {
    const { getByTestId } = render(<Header />);
    const scannerButton = getByTestId("scannerPage");
    expect(scannerButton).toHaveTextContent("Scanner");
  });
});



