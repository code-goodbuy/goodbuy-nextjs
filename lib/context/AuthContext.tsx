import { createContext, useState } from "react";
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
	const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<JWTPayloadType | undefined>();

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
