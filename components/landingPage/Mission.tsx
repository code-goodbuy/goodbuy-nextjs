import Picture from "../common/Picture";
import InfoCard from "./InfoCard";

export default function Mission() {
	const data = [
		{
			number: 10000000,
			unit: "Hectares",
			text: "of forests lost since the beginning of this year.",
			url: "http://www.fao.org/state-of-forests/en/"
		},
		{
			number: 36000000000,
			unit: "Tonnes",
			text: "of CO2 emitted since the beginning of this year",
			url: "https://ourworldindata.org/co2-emissions"
		},
		{
			number: 170344000000000,
			unit: "Liters",
			text: "of water wasted since the beginning of this year",
			url:
				"https://www.npr.org/sections/thesalt/2013/06/06/189192870/when-you-waste-food-youre-wasting-tons-of-water-too"
		}
	];

	return (
		<div className="normal-bg flex flex-col h-auto lg:max-h-900" id="mission">
			<h2 data-testid="mission-title" className="section-header">
				Our Mission
			</h2>
			<div className="flex flex-col justify-around lg:flex-row-reverse items-center pb-10 pt-10">
				<div className="flex flex-col justify-around items-center lg:ml-10">
					{data.map((i) => (
						<InfoCard key={i.number} {...i} />
					))}
				</div>
				<div className="flex flex-col items-center lg:mt-10 lg:max-w-1/2">
					<Picture
						source="/pics/waste.jpg"
						alt="Waste on Tropical Beach"
						isLarge={false}
						author="Dustan Woodhouse"
						authorLink="https://unsplash.com/@dwoodhouse"
						rotation="left"
					/>

					<p className="normal-text text-xl mx-10 mt-5 lg:mt-12 max-w-xl">
						Non-sustainable products contribute–among the others–to deforestation, CO2 emissions, and water waste. At
						GoodBuy, we want to make sure you have the means to make an informed decision about the products you buy.
					</p>
				</div>
			</div>
		</div>
	);
}
