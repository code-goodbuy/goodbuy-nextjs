import { useState, useEffect } from "react";
import TextTransition, { presets } from "react-text-transition";
import Image from "next/image";
import Link from "next/link";

export default function Welcome() {
	/**
	 * Responsive "Welcome" Section Of The Landing Page
	 */
	const products = [
		"avocado",
		"chocolate bar",
		"egg",
		"steak",
		"water bottle",
		"soda can",
		"sugar pack",
		"honey jar",
		"almond"
	];
	const [index, setIndex] = useState<number>(0);
	useEffect(() => {
		/**
		 * automatically update the title text
		 */
		const intervalId = setInterval(() => setIndex((index) => index + 1), 3000);
		return () => clearTimeout(intervalId);
	}, []);

	return (
		<div className="flex flex-col bg-white dark:bg-black max-h-900">
			<div className="flex flex-col h-90 max-h-700 justify-start md:justify-evenly lg:justify-between p-4 lg:px-10 items-center space-y-3 lg:flex-row lg:mt-4 2xl:pt-20">
				<div className="flex flex-col justify-start max-w-xl items-center lg:items-start lg:mr-5 lg:max-w-2xl 2xl:max-w-3xl">
					<div className="bear-image-bg md:bg-blue-100 md:dark:bg-red-200 lg:bg-gradient-to-r lg:from-blue-100 lg:via-blue-100 lg:to-white lg:dark:from-red-200 lg:dark:via-red-200 lg:dark:to-black min-h-1/2 md:min-h-0 rounded-b-2xl md:rounded-b-none w-screen lg:w-75 lg:h-48">
						<div
							data-testid="main-title"
							className="bg-blue-100 dark:bg-red-200 bg-opacity-60 dark:bg-opacity-60 md:bg-opacity-0 md:dark:bg-opacity-0 font-bold colorful-text mt-48 md:mt-10 md:pt-28 text-4xl md:text-5xl p-4 md:max-w-screen lg:max-w-xl lg:p-4 lg:mt-0 text-center lg:text-left h-36 md:h-auto 2xl:max-w-3xl"
						>
							Stop climate change,
							<br />
							one{" "}
							<TextTransition
								className="dynamic"
								text={products[index % products.length]}
								springConfig={presets.wobbly}
								inline={true}
							/>{" "}
							at a time.
						</div>
						<p className="colorful-text md:hidden mt-10 text-center bg-blue-100 dark:bg-red-200 bg-opacity-60 dark:bg-opacity-60">
							Photo by{" "}
							<a
								className="underline"
								href="https://unsplash.com/@hansjurgen007?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
							>
								Hans-Jurgen Mager
							</a>{" "}
							on{" "}
							<a
								className="underline"
								href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
							>
								Unsplash
							</a>
						</p>
					</div>
					<p className="normal-text text-xl mx-10 mt-5 lg:mt-14 max-w-xl 2xl:max-w-3xl">
						Don't buy products that harm the environment, animals, or the people that produce them.
					</p>
					<p className="normal-text text-xl mx-10 mt-5 max-w-xl 2xl:max-w-3xl">
						Start using GoodBuy and measure the inpact of the products you use.
					</p>
					<Link href="/auth?action=sign-up">
						<button className="colorful-button self-center mt-10">Start Now</button>
					</Link>
				</div>
				<div>
					<figure className="hidden md:block bg-primary dark:bg-secondary transform xl:rotate-12 rounded-3xl p-1 lg:p-2 text-center mx-10 md:mx-0 md:max-w-lg lg:w-7xl lg:mt-4 lg:mr-8 lg:max-w-2xl 2xl:max-w-3xl">
						<Image
							className="rounded-3xl"
							src="/pics/bear.jpg"
							alt="Polar Bear"
							layout="intrinsic"
							width="600"
							height="400"
						/>
						<figcaption className="text-white">
							<span>
								Photo by{" "}
								<a
									className="underline"
									href="https://unsplash.com/@hansjurgen007?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
								>
									Hans-Jurgen Mager
								</a>{" "}
								on{" "}
								<a
									className="underline"
									href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
								>
									Unsplash
								</a>
							</span>
						</figcaption>
					</figure>
				</div>
			</div>
			<a href="#mission" className="self-center">
				<svg
					height="24"
					width="24"
					className="h-10 fill-current text-primary dark:text-secondary mt-0 md:mt-10 lg:mt-4 animate-bounce"
				>
					<path d="M0 0h24v24H0V0z" fill="none" />
					<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" width="100%" height="100%" />
				</svg>
			</a>
		</div>
	);
}
