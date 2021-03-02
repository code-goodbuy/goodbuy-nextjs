import styles from "../../styles/LandingPage.module.css";
import { useContext } from "react";
import { UIContext } from "../../lib/context/UIContext";

export default function LandingPage() {
	const { colorMode, toggleColorMode } = useContext(UIContext);
	return (
		<div className={`${styles.container} bg-white dark:bg-black`}>
			<h1 className="text-3xl font-bold text-tufts-blue dark:text-red-crayola">
				Hello, Welcome to GoodBuy
			</h1>
			<p className="text-black dark:text-white">It looks empty now but it won't in the future 😀</p>
			<p className="text-black dark:text-white">The current color theme is: {<b>{colorMode}</b>}</p>
			<button
				onClick={toggleColorMode}
				className="text-lg px-3 text-white bg-tufts-blue rounded-full hover:bg-white hover:text-tufts-blue dark:bg-red-crayola dark:hover:bg-black dark:hover:text-red-crayola"
			>
				Toggle
			</button>
		</div>
	);
}
