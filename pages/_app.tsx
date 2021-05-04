import "../styles/globals.css";
import { AppProps } from "next/app";
import Layout from "../components/common/Layout";
import UIContextProvider from "../lib/context/UIContext";
import AuthContextProvider from "../lib/context/AuthContext";

function GoodBuy({ Component, pageProps }: AppProps) {
	return (
		<AuthContextProvider>
			<UIContextProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</UIContextProvider>
		</AuthContextProvider>
	);
}

export default GoodBuy;
