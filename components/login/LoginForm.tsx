import { useState, useEffect } from "react";
import { updateWithoutSpaces, checkEmail } from "./helperFunctions";
export default function LoginForm() {
	const [email, setEmail] = useState<string>("");
	const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
	const [password, setPassword] = useState<string>("");

	useEffect(() => {
		/**
		 * Every time the email is updated, it checks if it is valid
		 */
		checkEmail(setIsValidEmail, email);
	}, [email]);

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
			<input
				type="password"
				placeholder="password"
				onChange={(e) => updateWithoutSpaces(setPassword, e.target.value)}
				value={password || ""}
				className="field focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
			<button type="submit" form="login-form" className="colorful-button mb-10">
				Log In
			</button>
		</form>
	);
}
