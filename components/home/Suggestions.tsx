import { useEffect, useState } from "react";
import { SuggestionType } from "../../lib/types/SuggestionTypes";
import Suggestion from "./Suggestion";

export default function Suggestions() {
	const [suggestions, setSuggestions] = useState<SuggestionType[] | undefined>(undefined);

	async function getSuggestions() {
		let res = await fetch("/api/dev/get-feed");
		let data = await res.json();
		setSuggestions(data.suggestions);
	}

	useEffect(() => {
		getSuggestions();
	}, []);

	return (
		<div className="lg:flex lg:flex-row sm:hidden">
			{suggestions?.map((s) => (
				<Suggestion {...s} />
			))}
		</div>
	);
}
