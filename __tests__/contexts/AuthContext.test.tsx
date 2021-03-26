import React, { useContext, useEffect, useState } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthContextProvider, { AuthContext } from "../../lib/context/AuthContext";

const TempComponent = ({ token }: { token: string }) => {
	const { updateJWT } = useContext(AuthContext);
	const [msg, setMsg] = useState("nothing");
	useEffect(() => {
		try {
			updateJWT(token);
			setMsg("success");
		} catch {
			setMsg("error");
		}
	}, []);
	return <div data-testid="tokenMsg">{msg}</div>;
};

describe("test auth", () => {
	it("should test the auth", () => {
		//the test token below was generated online, so no security threats here
		//jti is your-256-bit-secret
		const { getByTestId } = render(
			<AuthContextProvider>
				<TempComponent token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC50ZXN0IiwiaWF0IjoxNjE2NzUwOTA3LCJleHAiOjQwMDAwMDAwMDAsImp0aSI6IjZlMDA3MTJmLTIxOTYtNGJjYS1iMzhmLTQ4MTFkOGI5MTAxOSJ9.hHvO7GQk4cqU1fL8-Ec6u7IFfpmBxMfNGsLKUqLeS64" />
			</AuthContextProvider>
		);

		const result = getByTestId("tokenMsg");

		expect(result).toHaveTextContent("success");
	});
});
