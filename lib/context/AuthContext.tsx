import { createContext, useState, useEffect } from "react";
import { ReactChildrenType } from "../types/ReactChildrenType";
import { JWTPayloadType, UserInfoType } from "../../lib/types/HelperTypes";
import { AuthContextType } from "../types/AuthTypes";
import { data } from "msw/lib/types/context";

export const AuthContext = createContext<AuthContextType>({});

const AuthContextProvider = ({ children }: ReactChildrenType) => {
	const getUserInfo = () => {
		const infoFromStorage = window.localStorage.getItem("userInfo");
		if (infoFromStorage) {
			return JSON.parse(infoFromStorage);
		}
		return undefined;
	};

	const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
	const [userInfo, setUserInfo] = useState<UserInfoType | undefined>();

	useEffect(() => {
		setUserInfo(getUserInfo());
		try {
			manageAuth();
		} catch {
			setIsLoggedIn(false);
		}
	}, []);

	useEffect(() => {
		if (isLoggedIn === true) {
			fetchUserData();
		}
	}, [isLoggedIn]);

	const fetchUserData = async () => {
		const res = await fetch("/api/profile");

		if (res.status === 200) {
			const data = await res.json();
			data.description = data.description ?? "Default description";
			data.imageURL = data.imageURL ?? "/pics/face.png";
			setUserInfo(data);
		}
	};

	const getAuthStatus = async () => {
		const res = await fetch("/api/check");
		const data = await res.json();
		return data.message;
	};

	const refreshToken = async () => {
		const res = await fetch("/api/refresh_token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ "email": userInfo && userInfo.email })
		});
		if (res.status !== 200) {
			throw Error("Server Error");
		}
		setIsLoggedIn(true);
	};

	const manageAuth = async () => {
		const status = await getAuthStatus();
		if (status === "logged") {
			setIsLoggedIn(true);
		} else if (status === "refresh") {
			try {
				refreshToken();
			} catch {
				setIsLoggedIn(false);
			}
		} else {
			setIsLoggedIn(false);
		}
	};

	const changeIsAuthenticating = (newValue: boolean): void => {
		setIsAuthenticating(newValue);
	};

	const toggleIsLoggedIn = (): void => {
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
