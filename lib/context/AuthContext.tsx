import { createContext, useState } from "react";
import { ReactChildrenType } from "../types/ReactChildrenType";
import jwt_decode, { JwtPayload } from "jwt-decode";

interface AuthType {
	isAuthenticating?: boolean;
	changeIsAuthenticating?: (newValue: boolean) => void;
	isLoggedIn?: boolean;
	toggleIsLoggedIn?: () => void;
	JWT?: string;
	updateJWT?: (newJWT: string) => void;
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
	 */
	const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [JWT, setJWT] = useState<string>("");

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

	const isValidJWT = (token: string): boolean => {
		try {
			jwt_decode<JwtPayload>(token);
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
		if (isValidJWT(newJWT) && !isExpiredJWT(jwt_decode(newJWT))) {
			setJWT(newJWT);
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
				updateJWT
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
