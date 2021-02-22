import styles from "../../styles/LandingPage.module.css";
import { useContext } from "react";
import { UIContext } from "../../lib/context/UIContext";

export default function LandingPage() {
	const { isDarkMode, toggleDarkMode } = useContext(UIContext);
	return (
		<div className={[styles.container, "bg"].join(" ")}>
			<h1 className={"primary-text"}>Hello, Welcome to GoodBuy</h1>
			<p className={"primary-text"}>It looks empty now but it won't in the future 😀</p>
			<p className={"primary-text"}>
				The current theme is dark: {isDarkMode ? <strong>True</strong> : <strong>False</strong>}
			</p>
			<button onClick={toggleDarkMode}>Toggle</button>
		</div>
	);
}
