import { render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import ScannerPage from "../components/utility/Scanner";
// Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'
// @ts-ignore
import { FetchMock } from '@react-mock/fetch';

// need self signed TLS Certs for reading camera list

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello there' }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("Scanner Component", () => {
  it("open modal and should be able to read the title", () => {
    // given: arrange
    render(<ScannerPage />);
    // when: act
    fireEvent.click(screen.getByText('Scanner'));
    // then: assert
    expect(screen.getByText('Barcode')).toBeVisible();
  });

  it("find start button and check the scanner element", () => {
    render(<ScannerPage />);
    fireEvent.click(screen.getByText('Scanner'));
    fireEvent.click(screen.getByText('Start'));
    expect(screen.queryByTestId('video-elm')).toBeVisible();
  });

  it("send the result and receives the product info", async () => {
    const alertMock = jest.spyOn(global, 'alert');
    render(
      <FetchMock
        matcher="/product/123456"
        response={200}
        config={{ fallbackToNetwork: true }}
      >
        <ScannerPage />
      </FetchMock>);
    // FIXME 
    expect(alertMock).not.toBeNull();
  })

  it("find close button, click and check wheter modal is still opened", () => {
    render(<ScannerPage />);
    fireEvent.click(screen.getByText('Scanner'));
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('close-button')).not.toBeInTheDocument();
  })
})
