import styles from "../../styles/LandingPage.module.css";
import { useContext } from "react";
import { UIContext } from "../../lib/context/UIContext";

export default function LandingPage() {
	const { colorMode, toggleColorMode } = useContext(UIContext);
	return (
		<div className={[styles.container, "bg"].join(" ")}>
			<h1 className={"secondary-text"}>Hello, Welcome to GoodBuy</h1>
			<p className={"primary-text"}>It looks empty now but it won't in the future 😀</p>
			<p className={"primary-text"}>The current color theme is: {<b>{colorMode}</b>}</p>
			<button onClick={toggleColorMode}>Toggle</button>
		</div>
	);
}
