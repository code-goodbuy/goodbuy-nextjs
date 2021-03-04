import { createContext, useState, useEffect } from "react";
import { ReactChildrenType } from "../types/ReactChildrenType";

interface UIType {
	colorMode?: "dark" | "light";
	toggleColorMode?: () => void;
	showMenu?: boolean;
	toggleShowMenu?: () => void;
}

export const UIContext = createContext<UIType>({});

const UIContextProvider = ({ children }: ReactChildrenType) => {
	/**
	 * Context provider for UI elements.
	 *
	 * Available properties:
	 *
	 * colorMode: "loght"|"dark";
	 * toggleColorMode: (): void;
	 * showMenu: boolean;
	 * toggleShowMenu: (): void;
	 */
	const getInitialColorMode = (): "dark" | "light" => {
		/**
		 * Retrieves the color mode preferred by the user, returns either "dark" or "light"
		 */
		// check if the user has a local preference
		const colorPreference: string | null = window.localStorage.getItem("color-mode");
		if (colorPreference != null && (colorPreference === "light" || colorPreference === "dark")) {
			return colorPreference;
		}
		//if not try to access the system preference
		const isdarkPreferred: boolean | undefined = window.matchMedia("(prefers-color-scheme: dark)")
			.matches;
		if (isdarkPreferred) {
			return isdarkPreferred ? "dark" : "light";
		}
		//if unavailable return "light"
		return "light";
	};

	const [colorMode, setColorMode] = useState<"dark" | "light">("light");
	const [showMenu, setShowMenu] = useState<boolean>(false);

	useEffect((): void => {
		/**
		 * on load, get the preferred color mode
		 */
		setColorMode(getInitialColorMode);
	}, []);

	useEffect((): void => {
		/**
		 * Watches for changes of "colorMode" and updates the css
		 */
		if (colorMode === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		window.localStorage.setItem("color-mode", colorMode);
	}, [colorMode]);

	const toggleColorMode = (): void => {
		/**
		 * Switch between dark and light mode
		 */
		colorMode === "light" ? setColorMode("dark") : setColorMode("light");
	};

	const toggleShowMenu = (): void => {
		/**
		 * Switch between hiding and showing the header links on mobile
		 */
		setShowMenu((current) => !current);
	};
	return (
		<UIContext.Provider value={{ colorMode, toggleColorMode, showMenu, toggleShowMenu }}>
			{children}
		</UIContext.Provider>
	);
};

export default UIContextProvider;
