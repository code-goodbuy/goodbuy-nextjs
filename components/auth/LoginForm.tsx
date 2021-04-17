import { useState, useEffect, useContext } from "react";
import { checkEmail, handleErr, handleRes, resetForm, sendAuthRequest } from "./helperFunctions";
import { AuthContext } from "../../lib/context/AuthContext";
import { useRouter } from "next/router";
import Field from "./Field";
import SubmitButton from "./SubmitButton";

export default function LoginForm() {
	const [email, setEmail] = useState<string>("");
	const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
	const [password, setPassword] = useState<string>("");
	const [isValidForm, setIsValidForm] = useState<boolean>(false);
	const [isSendingData, setIsSendingData] = useState<boolean>(false);
	const [serverResponse, setServerResponse] = useState<string>("");

	const { updateUserInfo, toggleIsLoggedIn } = useContext(AuthContext);

	const router = useRouter();

	useEffect(() => {
		/**
		 * Every time the email is updated, it checks if it is valid
		 */
		checkEmail(setIsValidEmail, email);
	}, [email]);

	useEffect(() => {
		/**
		 * Checks if the form can be submitted
		 */
		if (email !== "" && isValidEmail && password !== "") {
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
		try {
			let res = await sendAuthRequest("/api/login", userData);
			let specificHandler = async () => {
				let data = await res.json();
				updateUserInfo && updateUserInfo({ email: data.email });
				toggleIsLoggedIn && toggleIsLoggedIn();
				router.push("/");
			};
			handleRes({ res, setServerResponse, specificHandler });
		} catch (err) {
			handleErr(err);
		} finally {
			resetForm({ setIsSendingData, clearForm });
		}
	};

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			id="login-form"
			className="flex flex-col justify-center items-center my-14"
		>
			{serverResponse !== "" && <div className="pb-10 text-2xl colorful-text">{serverResponse}</div>}
			<Field value={email} setValue={setEmail} isValidValue={isValidEmail} type="text" name="Email" />
			<Field value={password} setValue={setPassword} isValidValue={true} type="password" name="Password" />
			<SubmitButton disabled={!isValidForm || isSendingData} updater={handleLogin} text="Log In" />
		</form>
	);
}
