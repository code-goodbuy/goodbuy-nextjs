import Feed from "./Feed";
import Search from "./Search";

export default function Home() {
	return (
		<div className="flex flex-col min-h-full items-center normal-bg w-full lg:flex-row lg:items-start justify-evenly">
			<Search />

			<Feed />
		</div>
	);
}
