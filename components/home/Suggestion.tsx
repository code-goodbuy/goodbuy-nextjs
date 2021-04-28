import Link from "next/link";
import { SuggestionType } from "../../lib/types/SuggestionTypes";
import { ProfilePic } from "../common/Misc";

export default function Suggestion({ scannedProducts, imageURL, username }: SuggestionType) {
	return (
		<div className="flex flex-row items-center my-4 w-80 mx-auto">
			<ProfilePic imageURL={imageURL} />
			<Link href={"/user/" + username}>
				<a className="colorful-text font-bold text-lg pl-4">{username}</a>
			</Link>
			<p className="normal-text pl-4">{scannedProducts} Products</p>
		</div>
	);
}
