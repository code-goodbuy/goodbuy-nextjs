import { createContext, useState } from "react";
import { ReactChildrenType } from "../types/ReactChildrenType";

interface UIType {
	isDarkMode?: boolean;
	toggleDarkMode?: () => void;
}

export const UIContext = createContext<UIType>({});

const UIContextProvider = ({ children }: ReactChildrenType) => {
	const [isDarkMode, setDarkMode] = useState<boolean>(false);
	const toggleDarkMode = (): void => {
		const root = document.documentElement;
		if (isDarkMode) {
			root.style.setProperty("--bg", "#ffffff");
			root.style.setProperty("--primary-text", "#000000");
		} else {
			root.style.setProperty("--bg", "#000000");
			root.style.setProperty("--primary-text", "#ffffff");
		}
		setDarkMode(!isDarkMode);
	};
	return <UIContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</UIContext.Provider>;
};

export default UIContextProvider;
