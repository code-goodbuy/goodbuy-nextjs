import { useState, useEffect } from "react";
import { UpdaterType } from "../../lib/types/ProfileTypes";
import { dataUpdater } from "../auth/helperFunctions";
import Router from "next/router";
import { sendChangeRequest, setIsValidURL, isDisabledForm } from "./helperFunctions";

import Field from "../auth/Field";
import SubmitButton from "../auth/SubmitButton";

export default function UpdateForm({ stateUpdater, currentInfo }: UpdaterType) {
	const [data, setData] = useState({ imageURL: "", description: "", isValidURL: false });
	const [isSendingData, setIsSendingData] = useState<boolean>(false);
	const [serverResponse, setServerResponse] = useState<string>("");

	useEffect(() => {
		setIsValidURL(data.imageURL, setData, data);
	}, [data.imageURL]);

	const handleSubmit = async () => {
		setIsSendingData(true);
		const { message } = await sendChangeRequest(currentInfo, data);
		if (message === "Error") {
			setServerResponse("Error");
		} else {
			setServerResponse("");
			Router.reload();
		}
		setIsSendingData(false);
	};

	return (
		<div className="fixed z-10 top-0 left-0 w-100 h-screen bg-opacity-50 bg-black flex justify-center items-center">
			<div className="rounded-xl mx-8 normal-bg ring-2 ring-primary dark:ring-secondary w-90 lg:w-50% flex flex-col justify-center items-center mt-4 md:mt-12 h-auto">
				<p
					onClick={() => {
						stateUpdater((c) => !c);
					}}
					className="colorful-text cursor-pointer mb-4 mr-4 text-2xl self-end"
				>
					X
				</p>
				{serverResponse !== "" && <div className="pb-10 text-2xl colorful-text">{serverResponse}</div>}
				<Field
					value={data.imageURL}
					setValue={dataUpdater("imageURL", data, setData)?.updater}
					isValidValue={data.isValidURL && data.imageURL.length > 7}
					type="text"
					name="New Image URL"
				/>
				<Field
					value={data.description}
					setValue={dataUpdater("description", data, setData)?.updater}
					isValidValue={data.description.length < 256}
					type="text"
					name="New Description"
					allowedSpaces={true}
				/>
				<SubmitButton disabled={isDisabledForm(isSendingData, data)} updater={handleSubmit} text="Update your Info" />
			</div>
		</div>
	);
}
