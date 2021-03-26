import { createContext, useState } from "react";
import { ReactChildrenType } from "../types/ReactChildrenType";
import jwt_decode from "jwt-decode";
import { JWTPayloadType } from "../../lib/types/HelperTypes";

interface AuthType {
	isAuthenticating?: boolean;
	changeIsAuthenticating?: (newValue: boolean) => void;
	isLoggedIn?: boolean;
	toggleIsLoggedIn?: () => void;
	JWT?: string;
	updateJWT?: (newJWT: string) => void;
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
	 * JWT?: string;
	 * updateJWT?: (newJWT: string) => void;
	 * userInfo?: JWTPayloadType | undefined;
	 * updateUserInfo?: (newInfo: JWTPayloadType) => void;
	 */
	const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [JWT, setJWT] = useState<string>("");
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

	const isValidJWT = (token: string): boolean => {
		try {
			jwt_decode<JWTPayloadType>(token);
			return true;
		} catch {
			return false;
		}
	};

	const isExpiredJWT = (exp: number): boolean => {
		if (Date.now() >= exp * 1000) {
			return true;
		} else {
			return false;
		}
	};

	const updateJWT = (newJWT: string): void | Error => {
		if (!isValidJWT(newJWT)) {
			throw new Error("Invalid / Expired JWT");
		}
		let decoded = jwt_decode<JWTPayloadType>(newJWT);
		if (decoded.exp && decoded.email && !isExpiredJWT(decoded.exp)) {
			setJWT(newJWT);
			updateUserInfo(decoded);
			console.log(decoded);
		} else {
			throw new Error("Invalid / Expired JWT");
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticating,
				changeIsAuthenticating,
				isLoggedIn,
				toggleIsLoggedIn,
				JWT,
				updateJWT,
				userInfo,
				updateUserInfo
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
