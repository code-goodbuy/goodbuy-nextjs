import { useState, useEffect } from "react";
import Link from "next/link";
import { checkEmail, checkUsername, checkPasswordStrength, checkPasswordMatch } from "./helperFunctions";
import { SignUpFormTypes as Props } from "../../lib/types/AuthTypes";
import Field from "./Field";
import Checkbox from "./Checkbox";

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
		/**
		 * Every time the email is updated, it checks if it is valid
		 */
		checkEmail(setIsValidEmail, email);
	}, [email]);

	useEffect(() => {
		/**
		 * Every time the username is updated, check if it is valid
		 */
		checkUsername(setIsValidUsername, username);
	}, [username]);

	useEffect(() => {
		/**
		 * Every time the password gets updated, check if it is strong
		 */
		checkPasswordStrength(setIsStrongPassword, password);
		if (repeatedPassword !== "") {
			//if the user changes the password and they already typed the second one, check if they match
			checkPasswordMatch(setIsRepeatedPasswordCorrect, repeatedPassword, password);
		}
	}, [password]);

	useEffect(() => {
		/**
		 *  Every time the second password gets updated, check if it matches the other
		 */
		checkPasswordMatch(setIsRepeatedPasswordCorrect, repeatedPassword, password);
	}, [repeatedPassword]);

	useEffect(() => {
		/**
		 * Checks if the form can be submitted
		 */
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

	const handleSignUp = () => {
		setIsSendingData(true);
		const userData = {
			email,
			username,
			password,
			acceptedTerms: hasAcceptedTerms,
			hasRequiredAge,
			tokenVersion: 0
		};

		fetch(BASE_URL + "/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(userData)
		})
			.then((res) => {
				if (res.status === 200) {
					setServerResponse("Success! Redirecting...");
					setTimeout(() => {
						setAction("login");
					}, msBeforeRedirecting);
				} else {
					setServerResponse("An Error Occured");
				}
				clearForm();
				setIsSendingData(false);
			})
			.catch((err) => {
				console.error(err);
				setServerResponse("An Error Occured");
				setIsSendingData(false);
			});
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
			<button
				type="submit"
				form="login-form"
				className="colorful-button"
				disabled={!isValidForm || isSendingData}
				onClick={handleSignUp}
			>
				Sign Up
			</button>
		</form>
	);
}
