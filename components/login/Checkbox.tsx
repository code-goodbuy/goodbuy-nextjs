import React from "react";
import { CheckboxType } from "../../lib/types/AuthTypes";

export default function Checkbox({ condition, updateCondition, children }: CheckboxType) {
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
