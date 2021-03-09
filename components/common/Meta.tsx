import { useContext } from "react";
import { UIContext } from "../../lib/context/UIContext";
import Head from "next/head";
import { MetaType } from "../../lib/types/MetaTypes";

const Meta = ({ title, keywords, description }: MetaType) => {
	/**
	 * Component for metadata customization
	 *
	 * Available Properties:
	 *
	 * title: string;
	 * keywords: string
	 * description: string
	 */
	const { colorMode } = useContext(UIContext);
	return (
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="keywords" content={keywords} />
			<meta name="description" content={description} />
			<meta name="theme-color" content={colorMode === "dark" ? "#000000" : "#ffffff"} />
			<meta charSet="utf-8" />
			<link rel="icon" href="/favicon.ico" />
			<title>{title}</title>
		</Head>
	);
};

Meta.defaultProps = {
	title: "GoodBuy",
	keywords: "goodbuy 2021 sustainable shopping",
	description:
		"Choose Products That Are Good For The Environment And The People That Produce Them With GoodBuy!"
};

export default Meta;
