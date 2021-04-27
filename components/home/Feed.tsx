import Post from "../common/Post";
import { useEffect, useState } from "react";
import { PostType } from "../../lib/types/PostTypes";

export default function Feed() {
	const [posts, setPosts] = useState<PostType[] | undefined>(undefined);

	async function getPosts() {
		let res = await fetch("/api/dev/get-feed");
		let data = await res.json();
		setPosts(data.posts);
	}

	useEffect(() => {
		getPosts();
	}, []);
	return (
		<div className="min-h-screen normal-bg normal-text pb-10 flex flex-col items-center lg:items-start lg:flex-row lg:justify-evenly pt-20">
			<div className="w-90 lg:w-6/12 lg:max-w-3xl">
				<h1 className="colorful-text font-bold text-2xl mx-auto text-center">Your Feed</h1>
				{posts !== undefined && posts?.map((c: PostType) => <Post key={c.EAN} {...c} />)}
			</div>
		</div>
	);
}
