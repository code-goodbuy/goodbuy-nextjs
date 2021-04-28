import { useState } from "react";
import { useRouter } from "next/router";

export default function Search() {
	const [query, setQuery] = useState<string>("");
	const router = useRouter();

	const handleChange = (newQuery: string) => {
		setQuery((_) => newQuery);
	};

	return (
		<form
			className="normal-bg lg:w-5/12 lg:max-w-3xl mt-28 m-2 flex justify-center lg:fixed lg:top-4 lg:left-8"
			onSubmit={(e) => {
				e.preventDefault();
				query.length > 4 && router.push("/user/" + query);
			}}
		>
			<input
				type="text"
				placeholder="Search User"
				onChange={(e) => handleChange(e.target.value)}
				value={query}
				className="outline-none border-0 normal-text text-lg field-bg w-4/5 rounded-tl-full rounded-bl-full focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
			<input
				type="submit"
				value="🔍"
				className="colorful-bg pl-2 pr-4 rounded-tr-full rounded-br-full hover:bg-gray-200 dark:hover:bg-gray-700"
			/>
		</form>
	);
}
