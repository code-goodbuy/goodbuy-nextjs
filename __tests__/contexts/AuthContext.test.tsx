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
		const { getByTestId } = render(
			<AuthContextProvider>
				<TempComponent token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC50ZXN0IiwiaWF0IjoxNjE2NzUwOTA3LCJleHAiOjE2MTY3NTQ1NDAsImp0aSI6IjZlMDA3MTJmLTIxOTYtNGJjYS1iMzhmLTQ4MTFkOGI5MTAxOSJ9.MSmLZCmQ1iqyULrED1dJaU3SvgtbljsoigeNufccUgg" />
			</AuthContextProvider>
		);

		const result = getByTestId("tokenMsg");

		expect(result).toHaveTextContent("success");
	});
});
