import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../lib/context/AuthContext";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function Auth() {
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
		<div className="min-h-full normal-bg flex flex-col justify-center items-center pt-14 md:pt-10 pb-5">
			<div className="rounded-md ml-8 mr-8 normal-bg ring-2 ring-primary dark:ring-secondary w-90 lg:w-50% flex flex-col mt-4 md:mt-12">
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
				<div>
					{action === "login" ? (
						<LoginForm />
					) : (
						<SignUpForm setAction={setAction} msBeforeRedirecting={1000} />
					)}
				</div>
			</div>
		</div>
	);
}
