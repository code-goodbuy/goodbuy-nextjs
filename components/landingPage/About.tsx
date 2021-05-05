import Image from "next/image";
import Picture from "../common/Picture";
import Person from "./Person";

export default function About() {
	const data = [
		{ fullName: "Name Surname 1", role: "role(s)", url: "https://www.linkedin.com", path: "/pics/face.png" },
		{ fullName: "Name Surname 2", role: "role(s)", url: "https://www.linkedin.com", path: "/pics/face.png" },
		{ fullName: "Name Surname 3", role: "role(s)", url: "https://www.linkedin.com", path: "/pics/face.png" },
		{ fullName: "Name Surname 4", role: "role(s)", url: "https://www.linkedin.com", path: "/pics/face.png" },
		{ fullName: "Name Surname 5", role: "role(s)", url: "https://www.linkedin.com", path: "/pics/face.png" },
		{ fullName: "Name Surname 6", role: "role(s)", url: "https://www.linkedin.com", path: "/pics/face.png" },
		{ fullName: "Name Surname 7", role: "role(s)", url: "https://www.linkedin.com", path: "/pics/face.png" }
	];

	return (
		<div className="flex flex-col normal-bg h-full" id="about">
			<h2 className="section-header">About Goodbuy</h2>
			<div className="flex flex-col justify-around lg:flex-row items-center pb-10 pt-10">
				<div className="flex flex-wrap justify-center mx-4 mt-10 md:max-w-3/4 lg:max-w-1/2">
					{data.map((person) => (
						<Person key={person.fullName} {...person} />
					))}
				</div>
				<div className="flex flex-col items-center lg:mt-10 lg:max-w-1/2">
					<Picture
						source="/pics/CODE.png"
						alt="CODE University"
						isLarge={false}
						author="CODE"
						authorLink="https://www.code.berlin"
					/>
					<p className="normal-text text-xl mx-10 md:mx-0 lg:mx-10 mt-5 lg:mt-12 max-w-xl">
						We are a group of 7 Software Engineering Students at CODE University of Applied Sciences who...
					</p>
				</div>
			</div>
		</div>
	);
}
