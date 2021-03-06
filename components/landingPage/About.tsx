import Image from "next/image";
import Person from "./Person";

export default function About() {
	return (
		<div className="flex flex-col normal-bg min-h-screen h-full" id="about">
			<h2 className="section-header">About Goodbuy</h2>
			<div className="flex flex-col justify-around lg:flex-row items-center pb-10">
				<div className="flex flex-wrap justify-center mx-4 mt-10 md:max-w-3/4 lg:max-w-1/2">
					<Person
						fullName={"Name Surname"}
						role={"role(s)"}
						url={"https://www.linkedin.com"}
						path="/pics/face.png"
					/>
					<Person
						fullName={"Name Surname"}
						role={"role(s)"}
						url={"https://www.linkedin.com"}
						path="/pics/face.png"
					/>
					<Person
						fullName={"Name Surname"}
						role={"role(s)"}
						url={"https://www.linkedin.com"}
						path="/pics/face.png"
					/>
					<Person
						fullName={"Name Surname"}
						role={"role(s)"}
						url={"https://www.linkedin.com"}
						path="/pics/face.png"
					/>
					<Person
						fullName={"Name Surname"}
						role={"role(s)"}
						url={"https://www.linkedin.com"}
						path="/pics/face.png"
					/>
					<Person
						fullName={"Name Surname"}
						role={"role(s)"}
						url={"https://www.linkedin.com"}
						path="/pics/face.png"
					/>
					<Person
						fullName={"Name Surname"}
						role={"role(s)"}
						url={"https://www.linkedin.com"}
						path="/pics/face.png"
					/>
				</div>
				<div className="flex flex-col items-center lg:mt-10 lg:max-w-1/2">
					<figure className="bg-primary dark:bg-secondary transform xl:rotate-12 rounded-3xl p-1 lg:p-2 text-center mx-10 md:mx-0 md:max-w-md lg:max-w-auto lg:w-7xl mt-10 lg:mt-0">
						<Image
							className="rounded-3xl"
							src="/pics/CODE.png"
							alt="Waste on tropical beach"
							layout="intrinsic"
							width="450"
							height="300"
						/>
						<figcaption className="text-white">
							<span>
								Photo by{" "}
								<a className="underline" href="https://www.code.berlin">
									CODE
								</a>
							</span>
						</figcaption>
					</figure>
					<p className="normal-text text-xl lg:mx-10 mt-5 lg:mt-12 max-w-xl">
						We are a group of 7 Software Engineering Students at CODE University of Applied Sciences
						who...
					</p>
				</div>
			</div>
		</div>
	);
}
