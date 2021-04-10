import { useContext } from "react";
import { AuthContext } from "../../lib/context/AuthContext";
import Link from "next/link";

export default function LogInButton() {
	const { changeIsAuthenticating } = useContext(AuthContext);
	return (
		<Link href="/auth">
			<button
				className="colorful-button"
				onClick={() => {
					changeIsAuthenticating && changeIsAuthenticating(true);
				}}
			>
				Log In
			</button>
		</Link>
	);
}
