import { createContext, useState, useEffect } from "react";
import { ReactChildrenType } from "../types/ReactChildrenType";
import { UIContextType } from "../types/UITypes";

export const UIContext = createContext<UIContextType>({});

const UIContextProvider = ({ children }: ReactChildrenType) => {
	const getInitialColorMode = (): "dark" | "light" => {
		const colorPreference: string | null = window.localStorage.getItem("color-mode");
		if (colorPreference != null && (colorPreference === "light" || colorPreference === "dark")) {
			return colorPreference;
		}

		const isdarkPreferred: boolean | undefined = window.matchMedia("(prefers-color-scheme: dark)").matches;
		if (isdarkPreferred) {
			return isdarkPreferred ? "dark" : "light";
		}

		return "light";
	};

	const [colorMode, setColorMode] = useState<"dark" | "light">("light");
	const [showMenu, setShowMenu] = useState<boolean>(false);

	useEffect((): void => {
		setColorMode(getInitialColorMode);
	}, []);

	useEffect((): void => {
		if (colorMode === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		window.localStorage.setItem("color-mode", colorMode);
	}, [colorMode]);

	const toggleColorMode = (): void => {
		colorMode === "light" ? setColorMode("dark") : setColorMode("light");
	};

	const toggleShowMenu = (): void => {
		setShowMenu((current) => !current);
	};
	return (
		<UIContext.Provider value={{ colorMode, toggleColorMode, showMenu, toggleShowMenu }}>{children}</UIContext.Provider>
	);
};

export default UIContextProvider;
