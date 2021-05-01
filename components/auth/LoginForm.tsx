import { useState, useEffect, useContext } from "react";
import { isValidEmail, handleAuth, dataUpdater } from "./helperFunctions";
import { AuthContext } from "../../lib/context/AuthContext";
import { useRouter } from "next/router";
import Field from "./Field";
import SubmitButton from "./SubmitButton";

export default function LoginForm() {
	const [data, setData] = useState({ email: "", password: "" });
	const [isValidForm, setIsValidForm] = useState<boolean>(false);
	const [isSendingData, setIsSendingData] = useState<boolean>(false);
	const [serverResponse, setServerResponse] = useState<string>("");

	const { updateUserInfo, toggleIsLoggedIn } = useContext(AuthContext);

	const router = useRouter();

	useEffect(() => {
		if (isValidEmail(data.email) && data.password !== "") {
			setIsValidForm(true);
		} else {
			setIsValidForm(false);
		}
	}, [data]);

	const clearForm = () => {
		setData({ email: "", password: "" });
	};

	const handleLogin = async () => {
		setIsSendingData(true);
		let specificHandler = async (res: Response) => {
			let data = await res.json();
			updateUserInfo && updateUserInfo({ email: data.email });
			toggleIsLoggedIn && toggleIsLoggedIn();
			router.push("/");
		};
		handleAuth({ url: "/api/login", data, specificHandler, setServerResponse, setIsSendingData, clearForm });
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
				setValue={dataUpdater("email", data, setData)?.updater}
				isValidValue={isValidEmail(data.email)}
				type="text"
				name="Email"
			/>
			<Field
				value={data.password}
				setValue={dataUpdater("password", data, setData)?.updater}
				isValidValue={true}
				type="password"
				name="Password"
			/>
			<SubmitButton disabled={!isValidForm || isSendingData} updater={handleLogin} text="Log In" />
		</form>
	);
}
