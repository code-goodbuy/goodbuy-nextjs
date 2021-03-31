import { useState, useEffect } from "react";
import Link from "next/link";
import {
	updateWithoutSpaces,
	checkEmail,
	checkUsername,
	checkPasswordStrength,
	checkPasswordMatch
} from "./helperFunctions";
import { SignUpFormTypes as Props } from "../../lib/types/AuthTypes";

export default function SignUpForm({ setAction, msBeforeRedirecting }: Props) {
	const [email, setEmail] = useState<string>("");
	const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
	const [username, setUsername] = useState<string>("");
	const [isValidUsername, setIsValidUsername] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [isStrongPassord, setIsStrongPassword] = useState<boolean>(false);
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
			isStrongPassord &&
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
		isStrongPassord,
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
		//test the sign up function
		setIsSendingData(true);
		const userData = {
			email,
			username,
			password,
			acceptedTerms: hasAcceptedTerms,
			hasRequiredAge
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
			{serverResponse !== "" && (
				<div className="pb-10 text-2xl colorful-text">{serverResponse}</div>
			)}
			{!isValidEmail && email !== "" && (
				<label data-testid="emailError" className="error-label">
					This email is not valid
				</label>
			)}
			<input
				type="text"
				placeholder="email"
				onChange={(e) => updateWithoutSpaces(setEmail, e.target.value)}
				value={email || ""}
				className="field focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
			{!isValidUsername && username !== "" && (
				<label data-testid="usernameError" className="error-label">
					This username is not valid
				</label>
			)}
			<input
				type="text"
				placeholder="username"
				onChange={(e) => updateWithoutSpaces(setUsername, e.target.value)}
				value={username || ""}
				className="field focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
			{!isStrongPassord && password !== "" && (
				<label data-testid="passwordError" className="error-label">
					This password is not strong enough
				</label>
			)}
			<input
				type="password"
				placeholder="password"
				onChange={(e) => updateWithoutSpaces(setPassword, e.target.value)}
				value={password || ""}
				className="field focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
			{!isRepeatedPasswordCorrect && repeatedPassword !== "" && (
				<label data-testid="repeatedPasswordError" className="error-label">
					The passwords do not match
				</label>
			)}
			<input
				type="password"
				placeholder="repeat password"
				onChange={(e) => updateWithoutSpaces(setRepeatedPassword, e.target.value)}
				value={repeatedPassword || ""}
				className="field focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
			<label className="w-4/5 mb-8">
				<input
					data-testid="termsCheckbox"
					type="checkbox"
					checked={hasAcceptedTerms || false}
					onChange={() => {
						setHasAcceptedTerms(!hasAcceptedTerms);
					}}
					className="outline-none border-0 text-primary dark:text-secondary bg-gray-200 dark:bg-gray-700 cursor-pointer w-6 h-6 rounded-sm"
				/>
				<span className="normal-text justify-self-start ml-4">
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
			</label>
			<label className="w-4/5 mb-8">
				<input
					data-testid="ageCheckbox"
					type="checkbox"
					checked={hasRequiredAge || false}
					onChange={() => {
						setHasRequiredAge(!hasRequiredAge);
					}}
					className="outline-none border-0 text-primary dark:text-secondary bg-gray-200 dark:bg-gray-700 cursor-pointer w-6 h-6 rounded-sm"
				/>
				<span className="normal-text justify-self-start ml-4">I am 16 or older.</span>
			</label>
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
