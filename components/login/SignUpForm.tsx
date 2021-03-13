import { useState } from "react";
import Link from "next/link";

export default function SignUpForm() {
	const [email, setEmail] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [repeatedPassword, setRepeatedPassword] = useState<string>("");
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
				type="text"
				placeholder="username"
				onChange={(e) => setUsername(e.target.value)}
				className="field focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
			<input
				type="password"
				placeholder="password"
				onChange={(e) => setPassword(e.target.value)}
				className="field focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
			<input
				type="password"
				placeholder="repeat password"
				onChange={(e) => setRepeatedPassword(e.target.value)}
				className="field focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
			<label className="inline-flex items-center self-start ml-20">
				<input
					type="checkbox"
					className="outline-none border-0 focus:ring-2 bg-gray-200 dark:bg-gray-700 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary w-6 h-6 rounded-sm colorful-text bg"
				/>
				<span className="normal-text ml-4">
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
				Log In
			</button>
		</form>
	);
}
