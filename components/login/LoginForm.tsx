import { useState } from "react";
export default function LoginForm() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			id="login-form"
			className="flex flex-col justify-center items-center space-y-8 my-14"
		>
			<input
				type="email"
				placeholder="email"
				onChange={(e) => setEmail(e.target.value)}
				className="field focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
			<input
				type="password"
				placeholder="password"
				onChange={(e) => setPassword(e.target.value)}
				className="field focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
			<button type="submit" form="login-form" className="colorful-button mb-10">
				Log In
			</button>
		</form>
	);
}
