import { useContext } from "react";
import { UIContext } from "../../lib/context/UIContext";
import Head from "next/head";
import { MetaType } from "../../lib/types/MetaTypes";

const Meta = ({ title, keywords, description }: MetaType) => {
	const { colorMode } = useContext(UIContext);
	return (
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="keywords" content={keywords} />
			<meta name="description" content={description} />
			<meta name="theme-color" content={colorMode === "dark" ? "#000000" : "#ffffff"} />
			<meta charSet="utf-8" />
			<link rel="icon" href="/icons/favicon.ico" />
			<link rel="manifest" href="/manifest.json" />
			<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
			<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#0197f6" />
			<title>{title}</title>
		</Head>
	);
};

Meta.defaultProps = {
	title: "GoodBuy",
	keywords: "goodbuy 2021 sustainable shopping",
	description: "Choose Products That Are Good For The Environment And The People That Produce Them With GoodBuy!"
};

export default Meta;
