import { useState, useEffect, useContext } from "react";
import { isValidEmail, handleAuth } from "./helperFunctions";
import { AuthContext } from "../../lib/context/AuthContext";
import { useRouter } from "next/router";
import Field from "./Field";
import SubmitButton from "./SubmitButton";

export default function LoginForm() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isValidForm, setIsValidForm] = useState<boolean>(false);
	const [isSendingData, setIsSendingData] = useState<boolean>(false);
	const [serverResponse, setServerResponse] = useState<string>("");

	const { updateUserInfo, toggleIsLoggedIn } = useContext(AuthContext);

	const router = useRouter();

	useEffect(() => {
		if (email !== "" && isValidEmail(email) && password !== "") {
			setIsValidForm(true);
		} else {
			setIsValidForm(false);
		}
	}, [email, password, isValidEmail]);

	const clearForm = () => {
		setEmail("");
		setPassword("");
	};

	const handleLogin = async () => {
		setIsSendingData(true);
		const userData = {
			email,
			password
		};
		let specificHandler = async (res: Response) => {
			let data = await res.json();
			updateUserInfo && updateUserInfo({ email: data.email });
			toggleIsLoggedIn && toggleIsLoggedIn();
			router.push("/");
		};
		handleAuth({ url: "/api/login", userData, specificHandler, setServerResponse, setIsSendingData, clearForm });
	};

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			id="login-form"
			className="flex flex-col justify-center items-center my-14"
		>
			{serverResponse !== "" && <div className="pb-10 text-2xl colorful-text">{serverResponse}</div>}
			<Field value={email} setValue={setEmail} isValidValue={isValidEmail(email)} type="text" name="Email" />
			<Field value={password} setValue={setPassword} isValidValue={true} type="password" name="Password" />
			<SubmitButton disabled={!isValidForm || isSendingData} updater={handleLogin} text="Log In" />
		</form>
	);
}
