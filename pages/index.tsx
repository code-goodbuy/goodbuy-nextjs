import { useContext } from "react";
import { AuthContext } from "../lib/context/AuthContext";
import Meta from "../components/common/Meta";
import LandingPage from "../components/landingPage/LandingPage";

export default function Home() {
	/**
	 * Renders The Landing Page
	 */
	const { isLoggedIn, userInfo } = useContext(AuthContext);
	if (isLoggedIn) {
		return (
			<>
				<Meta title={"GoodBuy | You are logged in"} />
				<div>{userInfo?.email}</div>
			</>
		);
	}
	return (
		<>
			<Meta title={"GoodBuy | Welcome to GoodBuy"} />
			<LandingPage />
		</>
	);
}
