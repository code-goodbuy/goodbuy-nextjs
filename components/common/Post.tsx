import { PostType } from "../../lib/types/CommonTypes";
import Link from "next/link";
import { ProfilePic } from "./Misc";

export default function Post({ title, EAN, country, likes, username, imageURL }: PostType) {
	return (
		<div className="border-2 colorful-border rounded-2xl my-4 mx-auto p-2 normal-text w-90 lg:w-11/12 max-w-3xl shadow-lg">
			<div className="flex flex-row items-center">
				<ProfilePic imageURL={imageURL} />
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
