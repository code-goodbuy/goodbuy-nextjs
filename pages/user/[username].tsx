function User({ username }: { username: string }) {
	return (
		<div className="min-h-screen normal-bg">
			<p className="pt-40 colorful-text text-6xl font-bold m-auto">{username}</p>
		</div>
	);
}

export async function getServerSideProps({ query }: { query: any }) {
	return { props: { username: query.username } };
}

export default User;
