import { useContext } from "react";
import { UIContext } from "../../lib/context/UIContext";

export default function LandingPage() {
	const { colorMode, toggleColorMode } = useContext(UIContext);
	return (
		<div
			className={`flex flex-col bg-white dark:bg-black min-h-screen justify-center items-center space-y-3`}
		>
			<h1 className="text-3xl font-bold colorful-text">Hello, Welcome to GoodBuy</h1>
			<p className="normal-text">It looks empty now but it won't in the future 😀</p>
			<p className="normal-text">The current color theme is: {<b>{colorMode}</b>}</p>
			<button onClick={toggleColorMode} className="text-lg px-5 colorful-button text-white w-auto">
				Toggle
			</button>
		</div>
	);
}
