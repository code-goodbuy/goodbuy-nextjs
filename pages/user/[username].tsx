import Meta from "../../components/common/Meta";
import Post from "../../components/common/Post";
import { DBPost } from "../../lib/types/PostTypes";
import { AuthContext } from "../../lib/context/AuthContext";
import { useContext } from "react";
import useRedirect from "../../lib/hooks/useRedirect";
import Counter from "../../components/profile/Counter";

function User({ username, data }: { username: string; data: any }) {
	const { isLoggedIn } = useContext(AuthContext);
	useRedirect(isLoggedIn !== undefined && !isLoggedIn, [isLoggedIn]);

	if (data.message === "Not Found") {
		return (
			<div className="min-h-screen normal-bg">
				<p className="pt-40 colorful-text text-2xl font-bold m-auto">Error 404</p>
			</div>
		);
	}

	return (
		<>
			<Meta title={`${username}'s Profile | Goodbuy`}></Meta>
			<div className="min-h-screen normal-bg normal-text pb-10 flex flex-col items-center lg:items-start lg:flex-row lg:justify-evenly pt-20">
				<div className="flex flex-col items-center justify-start w-90 lg:w-4/12 lg:max-w-md">
					<div
						className="mt-10 rounded-full border-4 colorful-border img-bg square-150"
						style={{ backgroundImage: "url(" + data.imageURL + ")" }}
						data-testid="profile-pic"
					></div>
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
					{data?.listOfScanned?.map((c: DBPost) => (
						<Post key={c.EAN} {...Object.assign(c, { username, imageURL: data?.imageURL })} />
					))}
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps({ query, req }: { query: any; req: any }) {
	const headers = await req.headers;
	const host = headers.host;
	const protocol = host.includes(":3000") ? "http://" : "https://";
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
