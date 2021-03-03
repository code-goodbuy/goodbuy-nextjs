import styles from "../../styles/LandingPage.module.css";
import { useContext } from "react";
import { UIContext } from "../../lib/context/UIContext";

export default function LandingPage() {
	const { colorMode, toggleColorMode } = useContext(UIContext);
	return (
		<div className={`${styles.container} bg-white dark:bg-black`}>
			<h1 className="text-3xl font-bold colorful-text">Hello, Welcome to GoodBuy</h1>
			<p className="normal-text">It looks empty now but it won't in the future 😀</p>
			<p className="normal-text">The current color theme is: {<b>{colorMode}</b>}</p>
			<button
				onClick={toggleColorMode}
				className="text-lg px-3 colorful-background text-white rounded-full ring-2 ring-primary dark:ring-secondary"
			>
				Toggle
			</button>
		</div>
	);
}
