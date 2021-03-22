import { render, screen, act, fireEvent, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../components/common/Header";
import ScannerPage from "../components/utility/Scanner";

describe("Test ScannerPage link", () => {
  it("should have a scanner page link", () => {
    const { getByTestId } = render(<Header />);
    const scannerButton = getByTestId("scannerPage");
    expect(scannerButton).toHaveTextContent("Scanner");
  });
});

describe("Test ScannerPage modal", () => {
  it("opens modal and check elements", () => {
    render(<Header />);
    // open scanner modal
    fireEvent.click(screen.getByText('Scanner'));
    // FIXME checks the title of the modal
    expect(screen.getByText("Barcode")).toBeInTheDocument();
    // checks the decoder 
    expect(screen.getByTestId("video-elm")).toBeInTheDocument();
    //  checks the dropdown select of the camera list
    expect(screen.getByTestId("camera-select")).toBeInTheDocument();
    
    // screen.debug();
  })
})


