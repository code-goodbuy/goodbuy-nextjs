import { PostType } from "../../lib/types/PostTypes";

export default function Post({ post, username, profileImage }: PostType) {
	return (
		<div className="border-2 colorful-border rounded-2xl my-6 mx-auto p-2 normal-text w-90 lg:w-11/12 max-w-3xl">
			<div className="flex flex-row items-center">
				<div
					className="rounded-full border-4 colorful-border square-50 img-bg"
					style={{ backgroundImage: "url(" + profileImage + ")" }}
				></div>
				<p className="pl-2">{username}</p>
			</div>
			<h3 className="colorful-text font-bold text-lg">{post.title}</h3>
			<p>
				<a href={"https://www.ean-search.org/?q=" + post.EAN} rel="noopener noreferrer" target="_blank">
					EAN: {post.EAN}
				</a>
			</p>
			<p>Country: {post.country}</p>
			<p>
				{post.likes}
				{"❤️"}
			</p>
		</div>
	);
}
