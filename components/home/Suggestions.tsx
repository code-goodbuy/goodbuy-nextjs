import { useEffect, useState } from "react";
import { SuggestionType } from "../../lib/types/SuggestionTypes";
import Suggestion from "./Suggestion";

export default function Suggestions() {
	const [suggestions, setSuggestions] = useState<SuggestionType[] | undefined>(undefined);

	async function getSuggestions() {
		let res = await fetch("/api/dev/get-suggestions");
		let data = await res.json();
		setSuggestions(data.suggestions);
	}

	useEffect(() => {
		getSuggestions();
	}, []);

	return (
		<div className="lg:flex lg:flex-col hidden lg:fixed lg:top-56 lg:left-8 lg:w-5/12 lg:max-w-3xl mb-2 suggestions-height overflow-y-auto">
			<h1 className="colorful-text font-bold text-2xl mx-auto text-center">Suggestions</h1>
			{suggestions?.map((s) => (
				<Suggestion key={s.username} {...s} />
			))}
		</div>
	);
}
