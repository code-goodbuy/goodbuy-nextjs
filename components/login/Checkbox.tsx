import React, { Dispatch, SetStateAction } from "react";

export default function Checkbox({
	condition,
	updateCondition,
	children
}: {
	condition: boolean;
	updateCondition: Dispatch<SetStateAction<boolean>>;
	children: React.ReactNode;
}) {
	return (
		<label className="w-4/5 mb-8">
			<input
				type="checkbox"
				checked={condition || false}
				onChange={() => {
					updateCondition(!condition);
				}}
				className="outline-none border-0 text-primary dark:text-secondary bg-gray-200 dark:bg-gray-700 cursor-pointer w-6 h-6 rounded-sm"
			/>
			<span className="normal-text justify-self-start ml-4">{children}</span>
		</label>
	);
}
