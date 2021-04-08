import Meta from "../components/common/Meta";
import Auth from "../components/auth/Auth";

export default function Home() {
	/**
	 * Renders The Landing Page
	 */
	return (
		<>
			<Meta title={"GoodBuy | Login or Sign Up"} />
			<Auth />
		</>
	);
}
