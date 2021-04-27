import { useContext } from "react";
import { AuthContext } from "../lib/context/AuthContext";
import Meta from "../components/common/Meta";
import LandingPage from "../components/landingPage/LandingPage";
import Home from "../components/home/Home";

export default function App() {
	const { isLoggedIn } = useContext(AuthContext);
	if (isLoggedIn === true) {
		return (
			<>
				<Meta title={"GoodBuy | You are logged in"} />
				<Home />
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
