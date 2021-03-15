import { useState, useEffect } from "react";
import Link from "next/link";
import {
	updateWithoutSpaces,
	checkEmail,
	checkUsername,
	checkPasswordStrength,
	checkPasswordMatch
} from "./helperFunctions";

export default function SignUpForm() {
	const [email, setEmail] = useState<string>("");
	const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
	const [username, setUsername] = useState<string>("");
	const [isValidUsername, setIsValidUsername] = useState<boolean>(true);
	const [password, setPassword] = useState<string>("");
	const [isStrongPassord, setIsStrongPassword] = useState<boolean>(true);
	const [repeatedPassword, setRepeatedPassword] = useState<string>("");
	const [isRepeatedPasswordCorrect, setIsRepeatedPasswordCorrect] = useState<boolean>(true);
	const [isCheckboxChecked, setIsCheckBoxChecked] = useState<boolean>(false);

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

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			id="login-form"
			className="flex flex-col justify-center items-center my-14"
		>
			{!isValidEmail && <label className="error-label">This email is not valid</label>}
			<input
				type="text"
				placeholder="email"
				onChange={(e) => updateWithoutSpaces(setEmail, e.target.value)}
				value={email || ""}
				className="field focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
			{!isValidUsername && <label className="error-label">This username is not valid</label>}
			<input
				type="text"
				placeholder="username"
				onChange={(e) => updateWithoutSpaces(setUsername, e.target.value)}
				value={username || ""}
				className="field focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
			{!isStrongPassord && (
				<label className="error-label">This password is not strong enough</label>
			)}
			<input
				type="password"
				placeholder="password"
				onChange={(e) => updateWithoutSpaces(setPassword, e.target.value)}
				value={password || ""}
				className="field focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
			{!isRepeatedPasswordCorrect && (
				<label className="error-label">The passwords do not match</label>
			)}
			<input
				type="password"
				placeholder="repeat password"
				onChange={(e) => updateWithoutSpaces(setRepeatedPassword, e.target.value)}
				value={repeatedPassword || ""}
				className="field focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
			<label className="inline-flex items-start self-start ml-10 md:ml-20 mb-8">
				<input
					type="checkbox"
					defaultChecked={isCheckboxChecked || false}
					onChange={() => {
						setIsCheckBoxChecked(!isCheckboxChecked);
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
			<button type="submit" form="login-form" className="colorful-button mb-10">
				Sign Up
			</button>
		</form>
	);
}
