import { SuggestionType } from "../../lib/types/SuggestionTypes";
import { ProfilePic } from "../common/Misc";

export default function Suggestion({ scannedProducts, imageURL, username }: SuggestionType) {
	return (
		<div className="flex flex-row">
			<ProfilePic imageURL={imageURL} />
			<p className="colorful-text">{username}</p>
			<p className="normal-text">{scannedProducts}</p>
		</div>
	);
}
