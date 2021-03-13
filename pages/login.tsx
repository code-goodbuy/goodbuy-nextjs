import Meta from "../components/common/Meta";
import Login from "../components/login/Login";

export default function Home() {
	/**
	 * Renders The Landing Page
	 */
	return (
		<>
			<Meta title={"GoodBuy | Login or Sign Up"} />
			<Login />
		</>
	);
}
