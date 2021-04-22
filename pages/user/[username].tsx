import Meta from "../../components/common/Meta";
import Image from "next/image";

function User({ username, data }: { username: string; data: any }) {
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
			<div className="min-h-screen normal-bg normal-text">
				<div className="pt-40" data-testid="profile-pic">
					<Image src={data.imageURL} layout="fixed" width="150" height="150" />
				</div>
				<p className="colorful-text text-2xl font-bold m-auto">{username}</p>
				<p>Scanned: {data?.scannedProducts || 0}</p>
				<p>Followers: {data?.followers || 0}</p>
				<p>Following: {data?.following || 0}</p>
				<p data-testid="description">{data?.description}</p>
				<button className="colorful-button">Follow</button>
			</div>
		</>
	);
}

export async function getServerSideProps({ query }: { query: any }) {
	const res = await fetch("http://localhost:3000/api/dev/get-info", {
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
