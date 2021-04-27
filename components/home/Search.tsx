import { useState } from "react";
import { useRouter } from "next/router";

export default function Search() {
	const [query, setQuery] = useState<string>("");
	const router = useRouter();

	const handleChange = (newQuery: string) => {
		setQuery((_) => newQuery);
	};

	return (
		<div className="normal-bg mt-28 w-75 lg:w-3/12 lg:max-w-3xl m-2 flex justify-center ">
			<input
				type="text"
				placeholder="Search User"
				onChange={(e) => handleChange(e.target.value)}
				value={query}
				className="outline-none border-0 normal-text text-lg field-bg w-4/5 rounded-tl-full rounded-bl-full focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
			<button
				onClick={() => {
					query.length > 4 && router.push("/user/" + query);
				}}
				className="colorful-bg pl-2 pr-4 rounded-tr-full rounded-br-full hover:bg-gray-200 dark:hover:bg-gray-700"
			>
				🔍
			</button>
		</div>
	);
}
