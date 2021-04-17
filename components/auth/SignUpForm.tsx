import { useState, useEffect } from "react";
import Link from "next/link";
import {
	checkEmail,
	checkUsername,
	checkPasswordStrength,
	checkPasswordMatch,
	sendAuthRequest,
	handleRes
} from "./helperFunctions";
import { SignUpFormTypes as Props } from "../../lib/types/AuthTypes";
import Field from "./Field";
import Checkbox from "./Checkbox";
import SubmitButton from "./SubmitButton";

export default function SignUpForm({ setAction, msBeforeRedirecting }: Props) {
	const [email, setEmail] = useState<string>("");
	const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
	const [username, setUsername] = useState<string>("");
	const [isValidUsername, setIsValidUsername] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [isStrongPassword, setIsStrongPassword] = useState<boolean>(false);
	const [repeatedPassword, setRepeatedPassword] = useState<string>("");
	const [isRepeatedPasswordCorrect, setIsRepeatedPasswordCorrect] = useState<boolean>(false);
	const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean>(false);
	const [hasRequiredAge, setHasRequiredAge] = useState<boolean>(false);
	const [isValidForm, setIsValidForm] = useState<boolean>(false);
	const [isSendingData, setIsSendingData] = useState<boolean>(false);
	const [serverResponse, setServerResponse] = useState<string>("");

	const BASE_URL = window.location.protocol + "//" + window.location.host;

	useEffect(() => {
		checkEmail(setIsValidEmail, email);
	}, [email]);

	useEffect(() => {
		checkUsername(setIsValidUsername, username);
	}, [username]);

	useEffect(() => {
		checkPasswordStrength(setIsStrongPassword, password);
		if (repeatedPassword !== "") {
			//if the user changes the password and they already typed the second one, check if they match
			checkPasswordMatch(setIsRepeatedPasswordCorrect, repeatedPassword, password);
		}
	}, [password]);

	useEffect(() => {
		checkPasswordMatch(setIsRepeatedPasswordCorrect, repeatedPassword, password);
	}, [repeatedPassword]);

	useEffect(() => {
		if (
			email !== "" &&
			username !== "" &&
			isValidEmail &&
			isValidUsername &&
			isStrongPassword &&
			isRepeatedPasswordCorrect &&
			hasAcceptedTerms &&
			hasRequiredAge
		) {
			setIsValidForm(true);
		} else {
			setIsValidForm(false);
		}
	}, [
		email,
		username,
		isValidEmail,
		isValidUsername,
		isStrongPassword,
		isRepeatedPasswordCorrect,
		hasAcceptedTerms,
		hasRequiredAge
	]);

	const clearForm = () => {
		setEmail("");
		setUsername("");
		setPassword("");
		setRepeatedPassword("");
		setHasAcceptedTerms(false);
		setHasRequiredAge(false);
	};

	const handleSignUp = async () => {
		setIsSendingData(true);
		const userData = {
			email,
			username,
			password,
			acceptedTerms: hasAcceptedTerms,
			hasRequiredAge,
			tokenVersion: 0
		};
		try {
			let res = await sendAuthRequest("/api/register", userData);
			let specificHandler = () => {
				setServerResponse("Success! Redirecting...");
				setTimeout(() => {
					setAction("login");
				}, msBeforeRedirecting);
			};
			handleRes({ res, setServerResponse, setIsSendingData, clearForm, specificHandler });
		} catch (err) {
			console.error(err);
			setServerResponse("An Error Occured");
			setIsSendingData(false);
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
			<Field value={username} setValue={setUsername} isValidValue={isValidUsername} type="text" name="Username" />
			<Field value={password} setValue={setPassword} isValidValue={isStrongPassword} type="password" name="Password" />
			<Field
				value={repeatedPassword}
				setValue={setRepeatedPassword}
				isValidValue={isRepeatedPasswordCorrect}
				type="password"
				name="Repeated Password"
			/>
			<Checkbox condition={hasAcceptedTerms} updateCondition={setHasAcceptedTerms}>
				<span>
					I read and accept the{" "}
					<span className="colorful-text">
						<Link href="about:blank">
							<a target="_blank" rel="noreferrer noopener">
								Terms and Conditions
							</a>
						</Link>
					</span>
					.
				</span>
			</Checkbox>
			<Checkbox condition={hasRequiredAge} updateCondition={setHasRequiredAge}>
				<span>I am 16 or older.</span>
			</Checkbox>
			<SubmitButton disabled={!isValidForm || isSendingData} updater={handleSignUp} text="Sign Up" />
		</form>
	);
}
