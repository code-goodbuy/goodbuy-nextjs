import { useState, useEffect } from "react";
import Link from "next/link";
import { isValidEmail, isValidUsername, isPasswordStrong, handleAuth, areSamePasswords } from "./helperFunctions";
import { SignUpFormTypes as Props } from "../../lib/types/AuthTypes";
import Field from "./Field";
import Checkbox from "./Checkbox";
import SubmitButton from "./SubmitButton";

export default function SignUpForm({ setAction, msBeforeRedirecting }: Props) {
	const [data, setData] = useState({
		email: "",
		username: "",
		password: "",
		repeatedPassword: "",
		hasAcceptedTerms: false,
		hasRequiredAge: false
	});

	const [isValidForm, setIsValidForm] = useState<boolean>(false);
	const [isSendingData, setIsSendingData] = useState<boolean>(false);
	const [serverResponse, setServerResponse] = useState<string>("");

	useEffect(() => {
		if (
			isValidEmail(data.email) &&
			isValidUsername(data.username) &&
			isPasswordStrong(data.password) &&
			areSamePasswords(data.repeatedPassword, data.password) &&
			data.hasAcceptedTerms &&
			data.hasRequiredAge
		) {
			setIsValidForm(true);
		} else {
			setIsValidForm(false);
		}
	}, [data]);

	const clearForm = () => {
		setData({
			email: "",
			username: "",
			password: "",
			repeatedPassword: "",
			hasAcceptedTerms: false,
			hasRequiredAge: false
		});
	};

	const handleSignUp = async () => {
		setIsSendingData(true);
		const userData = {
			email: data.email,
			username: data.password,
			password: data.repeatedPassword,
			acceptedTerms: data.hasAcceptedTerms,
			hasRequiredAge: data.hasRequiredAge,
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

	function dataUpdater(field: string) {
		if (field in data) {
			return {
				updater: (val: string | boolean) => {
					//@ts-ignore: manually check the type
					if (typeof data[field] === typeof val) {
						//@ts-ignore: manually check the type
						setData((data) => ({ ...data, [field]: val }));
					}
				}
			};
		}
	}

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			id="signup-form"
			className="flex flex-col justify-center items-center my-14"
		>
			{serverResponse !== "" && <div className="pb-10 text-2xl colorful-text">{serverResponse}</div>}
			<Field
				value={data.email}
				setValue={dataUpdater("email")?.updater}
				isValidValue={isValidEmail(data.email)}
				type="text"
				name="Email"
			/>
			<Field
				value={data.username}
				setValue={dataUpdater("username")?.updater}
				isValidValue={isValidUsername(data.username)}
				type="text"
				name="Username"
			/>
			<Field
				value={data.password}
				setValue={dataUpdater("password")?.updater}
				isValidValue={isPasswordStrong(data.password)}
				type="password"
				name="Password"
			/>
			<Field
				value={data.repeatedPassword}
				setValue={dataUpdater("repeatedPassword")?.updater}
				isValidValue={areSamePasswords(data.repeatedPassword, data.password)}
				type="password"
				name="Repeated Password"
			/>
			<Checkbox condition={data.hasAcceptedTerms} updateCondition={dataUpdater("hasAcceptedTerms")?.updater}>
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
			<Checkbox condition={data.hasRequiredAge} updateCondition={dataUpdater("hasRequiredAge")?.updater}>
				<span>I am 16 or older.</span>
			</Checkbox>
			<SubmitButton disabled={!isValidForm || isSendingData} updater={handleSignUp} text="Sign Up" />
		</form>
	);
}
