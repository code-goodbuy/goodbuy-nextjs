function User({ username, data }: { username: string; data: any }) {
	return (
		<div className="min-h-screen normal-bg">
			<p className="pt-40 colorful-text text-2xl font-bold m-auto">{username}</p>
			<p className="normal-text">Scanned: {data?.scannedProducts || 0}</p>
			<p className="normal-text">Followers: {data?.followers || 0}</p>
			<p className="normal-text">Following: {data?.following || 0}</p>
		</div>
	);
}

export async function getServerSideProps({ query }: { query: any }) {
	const res = await fetch("http://localhost:3000/api/dev/get-info");
	const data = await res.json();
	return { props: { username: query.username, data } };
}

export default User;
