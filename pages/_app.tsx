import "../styles/globals.css";
import { AppProps } from "next/app";
import Layout from "../components/common/Layout";
import UIContextProvider from "../lib/context/UIContext";

function GoodBuy({ Component, pageProps }: AppProps) {
	/**
	 * Renders The WebApp
	 */
	return (
		<UIContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</UIContextProvider>
	);
}

export default GoodBuy;
