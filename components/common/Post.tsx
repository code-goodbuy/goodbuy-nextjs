import { PostType } from "../../lib/types/PostTypes";
import Link from "next/link";

export default function Post({ title, EAN, country, likes, username, imageURL }: PostType) {
	return (
		<div className="border-2 colorful-border rounded-2xl my-6 mx-auto p-2 normal-text w-90 lg:w-11/12 max-w-3xl shadow-lg">
			<div className="flex flex-row items-center">
				<div
					className="rounded-full border-4 colorful-border square-50 img-bg"
					style={{ backgroundImage: "url(" + imageURL + ")" }}
				></div>
				<p className="pl-2">
					<Link href={"/user/" + username}>
						<a>{username}</a>
					</Link>
				</p>
			</div>
			<h3 className="colorful-text font-bold text-lg">{title}</h3>
			<p>
				<a href={"https://www.ean-search.org/?q=" + EAN} rel="noopener noreferrer" target="_blank">
					EAN: {EAN}
				</a>
			</p>
			<p>Country: {country}</p>
			<p>
				{likes}
				{"❤️"}
			</p>
		</div>
	);
}
