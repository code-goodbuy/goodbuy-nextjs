import { PostType } from "../../lib/types/PostTypes";
import Image from "next/image";

export default function Post({ title, EAN, country, username, image }: PostType) {
	return (
		<div className="border-2 colorful-border rounded-2xl my-6 p-2 normal-text w-90 lg:w-11/12 max-w-3xl">
			<div className="flex flex-row items-center">
				<Image layout="fixed" width="50" height="50" src={image} />
				<p className="pl-2">{username}</p>
			</div>
			<h3 className="colorful-text font-bold text-lg">{title}</h3>
			<p>EAN: {EAN}</p>
			<p>Country: {country}</p>
		</div>
	);
}
