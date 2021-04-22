import { PostType } from "../../lib/types/PostTypes";

export default function Post({ title, EAN, country, username }: PostType) {
	return (
		<div className="border-2 colorful-border rounded-2xl m-4 p-2 normal-text w-90 lg:w-50% max-w-3xl">
			<p>{username}</p>
			<h3 className="colorful-text">{title}</h3>
			<p>EAN: {EAN}</p>
			<p>Country: {country}</p>
		</div>
	);
}
