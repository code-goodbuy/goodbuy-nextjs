import { render, screen, act, fireEvent, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../components/common/Header";
import ScannerPage from "../components/utility/Scanner";

// NOTE UnhandledPromiseRejectionWarning: can't make a camera list on desktop

describe("Test ScannerPage link", () => {
  it("should have a scanner page link", () => {
    const { getByTestId } = render(<Header />);
    const scannerButton = getByTestId("scannerPage");
    expect(scannerButton).toHaveTextContent("Scanner");
  });
});

describe("Test ScannerPage modal", () => {
  it("opens modal and check inside", () => {
    render(<Header />);
    // modal opened
    fireEvent.click(screen.getByText('Scanner'))
    // checks title
    expect(screen.getByText('Barcode')).toBeVisible();
    // checks button trigger decoder
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    expect(screen.queryByText('video')).toBeInTheDocument;
  })
})

describe("Test scanner modal decoder video preview", () => {
  it("checks it's triggered after start button clicked", () => {
    render(<Header />);
    fireEvent.click(screen.getByText('Scanner'));
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    expect(screen.queryByText('video')).toBeInTheDocument;
    // screen.debug();
  })
})

