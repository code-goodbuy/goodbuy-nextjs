import Meta from "../components/common/Meta";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../lib/context/AuthContext";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";
import { useRouter } from "next/router";

const Auth = ({ action }: { action: "login" | "sign-up" }) => {
	const { isAuthenticating, changeIsAuthenticating, isLoggedIn } = useContext(AuthContext);
	const [formAction, setFormAction] = useState<"login" | "sign-up">(action);
	const router = useRouter();
	if (isLoggedIn) {
		router.push("/");
	}

	useEffect(() => {
		changeIsAuthenticating && changeIsAuthenticating(true);

		return () => {
			changeIsAuthenticating && changeIsAuthenticating(false);
		};
	}, [isAuthenticating]);

	function changeAction(text: string, newState: "login" | "sign-up") {
		return (
			<div
				className={"action-selector rounded-md" + (formAction !== newState && " colorful-bg-2")}
				onClick={() => {
					setFormAction(newState);
				}}
			>
				{text}
			</div>
		);
	}

	return (
		<>
			<Meta title={"GoodBuy | Login or Sign Up"} />
			<div className="min-h-full normal-bg flex flex-col justify-center items-center pt-14 md:pt-10 pb-5">
				<div className="rounded-md ml-8 mr-8 normal-bg ring-2 ring-primary dark:ring-secondary w-90 lg:w-50% flex flex-col mt-4 md:mt-12">
					<div className="flex flex-row">
						{changeAction("Login", "login")}
						{changeAction("Sign Up", "sign-up")}
					</div>
					<div>{formAction === "login" ? <LoginForm /> : <SignUpForm />}</div>
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps({ query }: { query: any }) {
	if (query.action && (query.action === "login" || query.action === "sign-up")) {
		return { props: { ...query } };
	}
	return { props: { action: "login" } };
}

export default Auth;
