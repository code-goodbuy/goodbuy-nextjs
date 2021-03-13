import { useContext, useEffect } from "react";
import { AuthContext } from "../../lib/context/AuthContext";

export default function Login() {
	/**
	 * Main Login / Register component
	 */
	const { isAuthenticating, changeIsAuthenticating } = useContext(AuthContext);

	useEffect(() => {
		changeIsAuthenticating && changeIsAuthenticating(true);

		return () => {
			changeIsAuthenticating && changeIsAuthenticating(false);
		};
	}, [isAuthenticating]);

	return (
		<div className="min-h-full normal-bg">
			<p className="pt-48 normal-text">Currently {isAuthenticating ? "yes" : "no"}</p>
		</div>
	);
}
