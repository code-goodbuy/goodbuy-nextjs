import Meta from "../../components/common/Meta";
import Post from "../../components/common/Post";
import { DBPost } from "../../lib/types/CommonTypes";
import { AuthContext } from "../../lib/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import useRedirect from "../../lib/hooks/useRedirect";
import Counter from "../../components/profile/Counter";
import UpdateForm from "../../components/profile/UpdateForm";
import { IncomingMessage } from "node:http";
import { ProfileDataType } from "../../lib/types/ProfileTypes";

function User({ username, data }: { username: string; data: ProfileDataType }) {
	const { isLoggedIn, userInfo } = useContext(AuthContext);
	const [isCurrentUser, setIsCurrentUser] = useState(false);
	const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);

	useRedirect(isLoggedIn !== undefined && !isLoggedIn, [isLoggedIn]);

	useEffect(() => {
		if (username == userInfo?.username) {
			setIsCurrentUser((c) => true);
		}
	}, [userInfo, isLoggedIn]);

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
			{isUpdatingInfo && userInfo?.email !== undefined && (
				<UpdateForm stateUpdater={setIsUpdatingInfo} currentInfo={userInfo} />
			)}
			<div className="min-h-screen normal-bg normal-text pb-10 flex flex-col items-center lg:items-start lg:flex-row lg:justify-evenly pt-20">
				<div className="flex flex-col items-center justify-start w-90 lg:w-4/12 lg:max-w-md">
					<div
						className="mt-10 rounded-full border-4 colorful-border img-bg square-150"
						style={{ backgroundImage: "url(" + (isCurrentUser ? userInfo?.imageURL : data.imageURL) + ")" }}
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
						{isCurrentUser ? userInfo?.description : data?.description}
					</p>
					{isCurrentUser ? (
						<button
							className="colorful-button"
							onClick={() => {
								setIsUpdatingInfo((c) => true);
							}}
						>
							Edit
						</button>
					) : (
						<button className="colorful-button">Follow</button>
					)}
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

export async function getServerSideProps({ query, req }: { query: { username: string }; req: IncomingMessage }) {
	const headers = await req.headers;
	const host = headers.host;
	const protocol = host && host.includes(":3000") ? "http://" : "https://";
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
