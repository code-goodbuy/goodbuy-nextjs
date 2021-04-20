import { useContext } from "react";
import { UIContext } from "../../lib/context/UIContext";

export default function ColroModeButton() {
	const { toggleColorMode, colorMode } = useContext(UIContext);
	return (
		<button
			onClick={toggleColorMode}
			data-testid="colorSwitcher"
			className="hover:text-primary dark:hover:text-secondary cursor-pointer"
		>
			{colorMode === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
		</button>
	);
}
