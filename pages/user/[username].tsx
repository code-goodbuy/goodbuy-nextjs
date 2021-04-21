import Meta from "../../components/common/Meta";

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
			<div className="min-h-screen normal-bg">
				<p className="pt-40 colorful-text text-2xl font-bold m-auto">{username}</p>
				<p className="normal-text">Scanned: {data?.scannedProducts || 0}</p>
				<p className="normal-text">Followers: {data?.followers || 0}</p>
				<p className="normal-text">Following: {data?.following || 0}</p>
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
	console.log("here");
	if (res.status !== 404) {
		const data = await res.json();
		return { props: { username: query.username, data } };
	}
	return { props: { username: query.username, data: { message: "Not Found" } } };
}

export default User;
