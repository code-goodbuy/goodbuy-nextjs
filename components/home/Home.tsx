import Feed from "./Feed";
import Search from "./Search";
import Suggestions from "./Suggestions";

export default function Home() {
	return (
		<div className="flex flex-col min-h-full items-center normal-bg w-full lg:flex-row lg:items-start justify-evenly">
			<div className="w-75 lg:w-5/12 lg:max-w-3xl">
				<Search />
				<Suggestions />
			</div>
			<Feed />
		</div>
	);
}
