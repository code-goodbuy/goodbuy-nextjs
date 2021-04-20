export interface UIContextType {
	colorMode?: "dark" | "light";
	toggleColorMode?: () => void;
	showMenu?: boolean;
	toggleShowMenu?: () => void;
}
