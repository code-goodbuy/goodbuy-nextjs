import { useContext } from "react";
import { AuthContext } from "../lib/context/AuthContext";
import Meta from "../components/common/Meta";
import LandingPage from "../components/landingPage/LandingPage";

export default function Home() {
	/**
	 * Renders The Landing Page
	 */
	const { isLoggedIn, userInfo } = useContext(AuthContext);
	if (isLoggedIn === true) {
		return (
			<>
				<Meta title={"GoodBuy | You are logged in"} />
				<div className="min-h-screen normal-bg">
					<p className="pt-20 pl-10 normal-text">email: {userInfo?.email}</p>
				</div>
			</>
		);
	} else if (isLoggedIn === false) {
		return (
			<>
				<Meta title={"GoodBuy | Welcome to GoodBuy"} />
				<LandingPage />
			</>
		);
	} else {
		return <div className="min-h-screen w-100 normal-bg"></div>;
	}
}
