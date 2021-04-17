import { useState, useEffect } from "react";
import Link from "next/link";
import { isValidEmail, isValidUsername, isPasswordStrong, handleAuth, areSamePasswords } from "./helperFunctions";
import { SignUpFormTypes as Props } from "../../lib/types/AuthTypes";
import Field from "./Field";
import Checkbox from "./Checkbox";
import SubmitButton from "./SubmitButton";

export default function SignUpForm({ setAction, msBeforeRedirecting }: Props) {
	const [email, setEmail] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [repeatedPassword, setRepeatedPassword] = useState<string>("");
	const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean>(false);
	const [hasRequiredAge, setHasRequiredAge] = useState<boolean>(false);
	const [isValidForm, setIsValidForm] = useState<boolean>(false);
	const [isSendingData, setIsSendingData] = useState<boolean>(false);
	const [serverResponse, setServerResponse] = useState<string>("");

	useEffect(() => {
		if (
			username !== "" &&
			isValidEmail(email) &&
			isValidUsername(username) &&
			isPasswordStrong(password) &&
			areSamePasswords(repeatedPassword, password) &&
			hasAcceptedTerms &&
			hasRequiredAge
		) {
			setIsValidForm(true);
		} else {
			setIsValidForm(false);
		}
	}, [email, username, password, repeatedPassword, hasAcceptedTerms, hasRequiredAge]);

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
		let specificHandler = () => {
			setServerResponse("Success! Redirecting...");
			setTimeout(() => {
				setAction("login");
			}, msBeforeRedirecting);
		};
		handleAuth({ url: "/api/register", userData, specificHandler, setServerResponse, setIsSendingData, clearForm });
	};

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			id="signup-form"
			className="flex flex-col justify-center items-center my-14"
		>
			{serverResponse !== "" && <div className="pb-10 text-2xl colorful-text">{serverResponse}</div>}
			<Field value={email} setValue={setEmail} isValidValue={isValidEmail(email)} type="text" name="Email" />
			<Field
				value={username}
				setValue={setUsername}
				isValidValue={isValidUsername(username)}
				type="text"
				name="Username"
			/>
			<Field
				value={password}
				setValue={setPassword}
				isValidValue={isPasswordStrong(password)}
				type="password"
				name="Password"
			/>
			<Field
				value={repeatedPassword}
				setValue={setRepeatedPassword}
				isValidValue={areSamePasswords(repeatedPassword, password)}
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
