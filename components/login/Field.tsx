import { Dispatch, SetStateAction } from "react";
import { updateWithoutSpaces } from "./helperFunctions";

export default function Field({
	value,
	setValue,
	isValidValue,
	type,
	name
}: {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	isValidValue: boolean;
	type: "text" | "password";
	name: string;
}) {
	return (
		<>
			{!isValidValue && value !== "" && <label className="error-label">Invalid {name}</label>}
			<input
				type={type}
				placeholder={name}
				onChange={(e) => updateWithoutSpaces(setValue, e.target.value)}
				value={value || ""}
				className="field focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
		</>
	);
}
