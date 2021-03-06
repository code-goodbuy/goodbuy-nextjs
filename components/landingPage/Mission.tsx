import Image from "next/image";
import InfoCard from "./InfoCard";

export default function Mission() {
	return (
		<div className="normal-bg flex flex-col min-h-screen h-full" id="mission">
			<h2 data-testid="mission-title" className="section-header">
				Our Mission
			</h2>
			<div className="flex flex-col justify-around lg:flex-row-reverse items-center pb-10">
				<div className="flex flex-col justify-around items-center lg:ml-10">
					<InfoCard
						number={10000000}
						unit={"Hectares"}
						text={"of forests lost since the beginning of this year."}
						url={
							"http://www.fao.org/state-of-forests/en/#:~:text=Between%202015%20and%202020%2C%20the,80%20million%20hectares%20since%201990."
						}
					/>
					<InfoCard
						number={36000000000}
						unit={"Tonnes"}
						text={"of CO2 emitted since the beginning of this year"}
						url={
							"https://ourworldindata.org/co2-emissions#:~:text=Emissions%20have%20continued%20to%20grow,36%20billion%20tonnes%20each%20year."
						}
					/>
					<InfoCard
						number={170344000000000}
						unit={"Liters"}
						text="of water wasted since the beginning of this year"
						url={
							"https://www.npr.org/sections/thesalt/2013/06/06/189192870/when-you-waste-food-youre-wasting-tons-of-water-too#:~:text=Now%20comes%20yet%20another%20reason,45%20trillion%20gallons%20of%20water."
						}
					/>
				</div>
				<div className="flex flex-col items-center lg:mt-10 lg:max-w-1/2">
					<figure className="bg-primary dark:bg-secondary transform xl:-rotate-12 rounded-3xl p-1 lg:p-2 text-center mx-10 md:mx-0 md:max-w-md lg:max-w-auto lg:w-7xl mt-10 lg:mt-0">
						<Image
							className="rounded-3xl"
							src="/pics/waste.jpg"
							alt="Waste on tropical beach"
							layout="intrinsic"
							width="450"
							height="300"
						/>
						<figcaption className="text-white">
							<span>
								Photo by{" "}
								<a
									className="underline"
									href="https://unsplash.com/@dwoodhouse?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
								>
									Dustan Woodhouse
								</a>{" "}
								on{" "}
								<a
									className="underline"
									href="https://unsplash.com/s/photos/waste?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
								>
									Unsplash
								</a>
							</span>
						</figcaption>
					</figure>
					<p className="normal-text text-xl mx-10 mt-5 lg:mt-12 max-w-xl">
						Non-sustainable products contribute–among the others–to deforestation, CO2 emissions,
						and water waste. At GoodBuy, we want to make sure you have the means to make an informed
						decision about the products you buy.
					</p>
				</div>
			</div>
		</div>
	);
}
