import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../lib/context/AuthContext";

export default function Login() {
	/**
	 * Main Login / Register component
	 */
	const { isAuthenticating, changeIsAuthenticating } = useContext(AuthContext);
	const [action, setAction] = useState<"login" | "sign-up">("login");

	useEffect(() => {
		changeIsAuthenticating && changeIsAuthenticating(true);

		return () => {
			changeIsAuthenticating && changeIsAuthenticating(false);
		};
	}, [isAuthenticating]);

	return (
		<div className="min-h-full normal-bg flex flex-col justify-center items-center">
			<div className="rounded-md ml-8 mr-8 normal-bg ring-2 ring-primary dark:ring-secondary min-h-3/4 w-90 flex flex-col">
				<div className="flex flex-row">
					<div
						className={"action-selector rounded-tl-md" + (action === "sign-up" && " colorful-bg-2")}
						onClick={() => {
							setAction("login");
						}}
					>
						Login
					</div>
					<div
						className={"action-selector rounded-tr-md" + (action === "login" && " colorful-bg-2")}
						onClick={() => {
							setAction("sign-up");
						}}
					>
						Sign Up
					</div>
				</div>
				<div></div>
			</div>
		</div>
	);
}
