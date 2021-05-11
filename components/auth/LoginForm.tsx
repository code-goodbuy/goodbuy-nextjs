import { useState, useEffect, useContext } from "react";
import { DataUpdater, FieldChecker, Authenticator } from "./helperFunctions";
import { AuthContext } from "../../lib/context/AuthContext";
import { useRouter } from "next/router";
import Field from "./Field";
import SubmitButton from "./SubmitButton";

export default function LoginForm() {
	const [data, setData] = useState({ email: "", password: "" });
	const [isSendingData, setIsSendingData] = useState<boolean>(false);
	const [serverResponse, setServerResponse] = useState<string>("");

	const checker = new FieldChecker(data);
	const updater = new DataUpdater(data, setData);

	const { updateUserInfo, toggleIsLoggedIn } = useContext(AuthContext);

	const router = useRouter();

	useEffect(() => {
		checker.updateData(data);
	}, [data]);

	const clearForm = () => {
		setData({ email: "", password: "" });
	};

	const responseHandler = async (res: Response | undefined) => {
		let data = res && (await res.json());
		updateUserInfo && updateUserInfo({ _id: data._id });
		toggleIsLoggedIn && toggleIsLoggedIn();
		router.push("/");
	};

	const handleLogin = async () => {
		const formFunctions = { clearForm, setServerResponse, setIsSendingData, responseHandler };
		const auth = new Authenticator("/api/login", data, formFunctions);
		auth.handleAuth();
	};

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			id="login-form"
			className="flex flex-col justify-center items-center my-14"
		>
			{serverResponse !== "" && <div className="pb-10 text-2xl colorful-text">{serverResponse}</div>}
			<Field
				value={data.email}
				setValue={updater.makeUpdater("email")}
				isValidValue={checker.isValidEmail()}
				name="Email"
			/>
			<Field
				value={data.password}
				setValue={updater.makeUpdater("password")}
				isValidValue={true}
				type="password"
				name="Password"
			/>
			<SubmitButton disabled={!checker.isValidLogin() || isSendingData} updater={handleLogin} text="Log In" />
		</form>
	);
}
