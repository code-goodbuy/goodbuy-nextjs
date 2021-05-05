import { FieldType } from "../../lib/types/AuthTypes";

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
					setValue && (allowedSpaces ? setValue(e.target.value) : setValue(e.target.value.replace(/\s/g, "")))
				}
				value={value || ""}
				className="field focus:ring-2 focus:ring-primary dark:focus:ring-2 dark:focus:ring-secondary"
			/>
		</>
	);
}
