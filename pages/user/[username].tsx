import Meta from "../../components/common/Meta";
import Image from "next/image";
import Post from "../../components/posts/Post";
import { PostType } from "../../lib/types/PostTypes";

function User({ username, data }: { username: string; data: any }) {
	if (data.message === "Not Found") {
		return (
			<div className="min-h-screen normal-bg">
				<p className="pt-40 colorful-text text-2xl font-bold m-auto">Error 404</p>
			</div>
		);
	}

	const Counter = ({ number, name }: { number: number; name: string }) => {
		return (
			<div className="text-center p-4">
				<h3 className="text-lg font-bold">{number || 0}</h3>
				<p>{name}</p>
			</div>
		);
	};

	return (
		<>
			<Meta title={`${username}'s Profile | Goodbuy`}></Meta>
			<div className="min-h-screen normal-bg normal-text pb-10 flex flex-col items-center lg:items-start lg:flex-row lg:justify-evenly pt-20">
				<div className="flex flex-col items-center justify-start w-90 lg:w-4/12 lg:max-w-md">
					<div className="pt-10" data-testid="profile-pic">
						<Image src={data.imageURL} layout="fixed" width="150" height="150" />
					</div>
					<p className="colorful-text text-2xl font-bold" data-testid="username">
						{username}
					</p>
					<div className="flex flex-row">
						<Counter number={data?.scannedProducts || 0} name={"Scanned"} />
						<Counter number={data?.followers || 0} name={"Followers"} />
						<Counter number={data?.following || 0} name={"Following"} />
					</div>
					<p data-testid="description" className="mb-5">
						{data?.description}
					</p>

					<button className="colorful-button">Follow</button>
				</div>
				<div className="w-90 lg:w-6/12 lg:max-w-3xl">
					{data?.listOfScanned?.map((c: PostType) => (
						<Post
							key={c.EAN}
							title={c.title}
							EAN={c.EAN}
							country={c.country}
							username={username}
							image={data?.imageURL}
						/>
					))}
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps({ query, req }: { query: any; req: any }) {
	const headers = await req.headers;
	const host = headers.host;
	const protocol = host.includes("localhost") ? "http://" : "https://";
	const res = await fetch(protocol + host + "/api/dev/get-info", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ "user": query.username })
	});
	if (res.status !== 404) {
		const data = await res.json();
		return { props: { username: query.username, data } };
	}
	return { props: { username: query.username, data: { message: "Not Found" } } };
}

export default User;
