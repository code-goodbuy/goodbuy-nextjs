import { useState, useEffect } from "react";
import Link from "next/link";
import { DataUpdater, FieldChecker, Authenticator } from "./helperFunctions";
import Field from "./Field";
import Checkbox from "./Checkbox";
import SubmitButton from "./SubmitButton";

export default function SignUpForm() {
	const defaultData = {
		email: "",
		username: "",
		password: "",
		repeatedPassword: "",
		acceptedTerms: false,
		hasRequiredAge: false
	};
	const [data, setData] = useState(defaultData);

	const [isSendingData, setIsSendingData] = useState<boolean>(false);
	const [serverResponse, setServerResponse] = useState<string>("");

	const checker = new FieldChecker(data);
	const updater = new DataUpdater(data, setData);

	useEffect(() => {
		checker.updateData(data);
	}, [data]);

	const clearForm = () => {
		setData(defaultData);
	};

	let responseHandler = () => {
		setServerResponse("Check your email and then log in");
	};

	const handleSignUp = async () => {
		const formFunctions = { clearForm, setServerResponse, setIsSendingData, responseHandler };
		const auth = new Authenticator("/api/register", data, formFunctions);
		auth.handleAuth();
	};

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			id="signup-form"
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
				value={data.username}
				setValue={updater.makeUpdater("username")}
				isValidValue={checker.isValidUsername()}
				name="Username"
			/>
			<Field
				value={data.password}
				setValue={updater.makeUpdater("password")}
				isValidValue={checker.isValidPassword()}
				type="password"
				name="Password"
			/>
			<Field
				value={data.repeatedPassword}
				setValue={updater.makeUpdater("repeatedPassword")}
				isValidValue={checker.areSamePasswords()}
				type="password"
				name="Repeated Password"
			/>
			<Checkbox condition={data.acceptedTerms} updateCondition={updater.makeUpdater("acceptedTerms")}>
				<span>
					I read and accept the{" "}
					<Link href="about:blank">
						<a target="_blank" rel="noreferrer noopener" className="colorful-text">
							Terms and Conditions
						</a>
					</Link>
					.
				</span>
			</Checkbox>
			<Checkbox condition={data.hasRequiredAge} updateCondition={updater.makeUpdater("hasRequiredAge")}>
				<span>I am 16 or older.</span>
			</Checkbox>
			<SubmitButton disabled={!checker.isValidSignUp() || isSendingData} updater={handleSignUp} text="Sign Up" />
		</form>
	);
}
