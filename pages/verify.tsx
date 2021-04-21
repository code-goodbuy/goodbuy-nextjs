import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Meta from "../components/common/Meta";
import { AuthContext } from "../lib/context/AuthContext";

const Verify = ({ token }: { token: string }) => {
	const { changeIsAuthenticating, isLoggedIn } = useContext(AuthContext);
	const [message, setMessage] = useState("");
	const router = useRouter();
	if (isLoggedIn) {
		router.push("/");
	}

	useEffect(() => {
		changeIsAuthenticating && changeIsAuthenticating(true);
		return () => {
			changeIsAuthenticating && changeIsAuthenticating(false);
		};
	}, []);

	const validate = async (token: string) => {
		const res = await fetch(process.env.backendURL + "/confirm_email/" + token, { method: "POST" });
		if (res.status === 200) {
			setMessage("Success");
			router.push("/auth");
		} else {
			setMessage("Error");
		}
	};

	validate(token);

	return (
		<>
			<Meta title={"GoodBuy | Verify your account"}></Meta>
			<div className="min-h-screen normal-bg text-center">
				<p className="pt-40 colorful-text text-6xl font-bold m-auto">{message}</p>
			</div>
		</>
	);
};

export async function getServerSideProps({ query }: { query: any }) {
	if (query.token) {
		return { props: { ...query } };
	}
	return { props: { token: "" } };
}

export default Verify;
