import { SubmitType } from "../../lib/types/AuthTypes";

export default function SubmitButton({ updater, disabled, text }: SubmitType) {
	return (
		<button type="submit" form="login-form" className="colorful-button mb-6" disabled={disabled} onClick={updater}>
			{text}
		</button>
	);
}
