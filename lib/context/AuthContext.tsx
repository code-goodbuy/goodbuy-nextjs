import { createContext, useState, useEffect } from "react";
import { ReactChildrenType } from "../types/ReactChildrenType";

interface AuthType {
	isAuthenticating?: boolean;
	changeIsAuthenticating?: (newValue: boolean) => void;
	isLoggedIn?: boolean;
	toggleIsLoggedIn?: () => void;
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
	return (
		<AuthContext.Provider
			value={{ isAuthenticating, changeIsAuthenticating, isLoggedIn, toggleIsLoggedIn }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
