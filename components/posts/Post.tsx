import { PostType } from "../../lib/types/PostTypes";

export default function Post({ title, EAN, country, username, image }: PostType) {
	return (
		<div className="border-2 colorful-border rounded-2xl my-6 mx-auto p-2 normal-text w-90 lg:w-11/12 max-w-3xl">
			<div className="flex flex-row items-center">
				<div className="rounded-full border-4 colorful-border w-auto h-auto" data-testid="profile-pic">
					<img src={image} width="50" height="50" className="object-cover rounded-full" />
				</div>
				<p className="pl-2">{username}</p>
			</div>
			<h3 className="colorful-text font-bold text-lg">{title}</h3>
			<p>EAN: {EAN}</p>
			<p>Country: {country}</p>
		</div>
	);
}
