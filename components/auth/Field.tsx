import { FieldType } from "../../lib/types/AuthTypes";
import { updateWithoutSpaces } from "./helperFunctions";

export default function Field({
	value,
	setValue,
	isValidValue,
	type = "text",
	name,
	allowedSpaces = false
}: FieldType) {
	return (
		<>
			{!isValidValue && value !== "" && <label className="error-label">Invalid {name}</label>}
			<input
				type={type}
				placeholder={name}
				onChange={(e) =>
					allowedSpaces ? setValue && setValue(e.target.value) : updateWithoutSpaces(setValue, e.target.value)
				}
				value={value || ""}
				className="field focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
		</>
	);
}
