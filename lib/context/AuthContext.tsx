import { createContext, useState, useEffect } from "react";
import { ReactChildrenType } from "../types/ReactChildrenType";
import { JWTPayloadType } from "../../lib/types/HelperTypes";

interface AuthType {
	isAuthenticating?: boolean;
	changeIsAuthenticating?: (newValue: boolean) => void;
	isLoggedIn?: boolean;
	toggleIsLoggedIn?: () => void;
	userInfo?: JWTPayloadType;
	updateUserInfo?: (newInfo: JWTPayloadType) => void;
}

export const AuthContext = createContext<AuthType>({});

const AuthContextProvider = ({ children }: ReactChildrenType) => {
	/**
	 * Context provider for authentication.
	 *
	 * Available properties:
	 *
	 * isAuthenticating: boolean
	 * changeIsAuthenticating: (newValue: boolean): void;
	 * isLoggedIn: boolean;
	 * toggleIsLoggedIn: (): void;
	 * userInfo?: JWTPayloadType | undefined;
	 * updateUserInfo?: (newInfo: JWTPayloadType) => void;
	 */
	const getUserInfo = () => {
		const infoFromStorage = window.localStorage.getItem("userInfo");
		if (infoFromStorage) {
			return JSON.parse(infoFromStorage);
		}
		return undefined;
	};

	const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
	const [userInfo, setUserInfo] = useState<JWTPayloadType | undefined>();

	useEffect(() => {
		setUserInfo(getUserInfo());
		fetch("/api/check")
			.then((res) => res.json())
			.then((data) => {
				if (data.message === "logged") {
					setIsLoggedIn(true);
				} else if (data.message === "refresh") {
					fetch("/api/refresh_token", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ "email": userInfo && userInfo.email })
					})
						.then((res) => {
							if (res.status === 200) {
								res.json();
							} else {
								throw Error("Server Error");
							}
						})
						.then(() => {
							setIsLoggedIn(true);
						})
						.catch((err) => {
							console.log(err);
							setIsLoggedIn(false);
						});
				} else {
					setIsLoggedIn(false);
				}
			})
			.catch((err) => console.error(err));
	}, []);

	const changeIsAuthenticating = (newValue: boolean): void => {
		/**
		 * Changes the value of IsAuthenticated
		 */
		setIsAuthenticating(newValue);
	};
	const toggleIsLoggedIn = (): void => {
		/**
		 * Changes the value of IsAuthenticated
		 */
		setIsLoggedIn((current) => !current);
	};

	const updateUserInfo = (newInfo: JWTPayloadType) => {
		setUserInfo(newInfo);
		window.localStorage.setItem("userInfo", JSON.stringify(newInfo));
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticating,
				changeIsAuthenticating,
				isLoggedIn,
				toggleIsLoggedIn,
				userInfo,
				updateUserInfo
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
