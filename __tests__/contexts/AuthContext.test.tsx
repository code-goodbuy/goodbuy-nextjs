import React, { useContext, useEffect, useState } from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthContextProvider, { AuthContext } from "../../lib/context/AuthContext";
import { JWTPayloadType } from "../../lib/types/HelperTypes";

const TempComponent = ({ userInfo }: { userInfo: JWTPayloadType }) => {
	const { updateUserInfo, toggleIsLoggedIn, isLoggedIn } = useContext(AuthContext);
	const [msg, setMsg] = useState("nothing");
	useEffect(() => {
		try {
			updateUserInfo && updateUserInfo(userInfo);
			toggleIsLoggedIn && toggleIsLoggedIn();
			setMsg("success");
		} catch {
			setMsg("error");
		}
	}, []);
	return (
		<>
			<div data-testid="msg">{msg}</div>
			<div data-testid="loggedIn">{isLoggedIn ? "logged in" : "not logged in"}</div>
		</>
	);
};

describe("Test the context", () => {
	test("the context values should change", () => {
		//the test token below was generated online, so no security threats here
		//jti is your-256-bit-secret
		const { getByTestId } = render(
			<AuthContextProvider>
				<TempComponent
					userInfo={{
						"email": "test@test.test",
						"exp": 4000000000,
						"iat": 1616750907,
						"jti": "6e00712f-2196-4bca-b38f-4811d8b91019"
					}}
				/>
			</AuthContextProvider>
		);

		const result = getByTestId("msg");
		const isLoggedIn = getByTestId("loggedIn");

		expect(result).toHaveTextContent("success");
		expect(isLoggedIn).toHaveTextContent("logged in");
	});
});
