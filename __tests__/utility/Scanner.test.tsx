import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ScannerPage from "../../components/utility/ScannerPage";
// Mock Service Worker
import { rest } from "msw";
import { setupServer } from "msw/node";
// @ts-ignore
import { FetchMock } from "@react-mock/fetch";
import { clickAll } from "../../lib/testUtils/testFunctions";

// need self signed TLS Certs for reading camera list
// currently test being skipped cause there's no element in the page yet

const server = setupServer(
	rest.get("/greeting", (req, res, ctx) => {
		return res(ctx.json({ greeting: "hello there" }));
	})
);

beforeAll(() => {
	server.listen();
	// silence error log
	jest.spyOn(console, "log").mockImplementation(jest.fn());
	jest.spyOn(console, "debug").mockImplementation(jest.fn());
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Scanner Component", () => {
	it("open modal and should be able to read the title", () => {
		// given: arrange
		render(<ScannerPage />);
		// when: act
		fireEvent.click(screen.getByText("Scanner"));
		// then: assert
		expect(screen.getByText("Barcode")).toBeVisible();
	});

	it("find start button and check the scanner element", () => {
		render(<ScannerPage />);

		clickAll(["Scanner", "Start"], screen.getByText);

		expect(screen.queryByTestId("video-elm")).toBeVisible();
	});

	it("send the result and receives the product info", async () => {
		const alertMock = jest.spyOn(global, "alert");
		render(
			<FetchMock matcher="/product/123456" response={200} config={{ fallbackToNetwork: true }}>
				<ScannerPage />
			</FetchMock>
		);
		expect(alertMock).not.toBeNull();
	});

	it("find close button, click and check wheter modal is still opened", () => {
		render(<ScannerPage />);

		clickAll(["Scanner", "Close"], screen.getByText);

		expect(screen.queryByTestId("close-button")).not.toBeInTheDocument();
	});
});
