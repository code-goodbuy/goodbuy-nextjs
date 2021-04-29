import { useState, useEffect } from "react";
import { UpdaterType } from "../../lib/types/ProfileTypes";
import { dataUpdater } from "../auth/helperFunctions";
import Router from "next/router";

import Field from "../auth/Field";
import SubmitButton from "../auth/SubmitButton";

export default function UpdateForm({ stateUpdater, currentInfo }: UpdaterType) {
	const [data, setData] = useState({ imageURL: "", description: "", isValidURL: false });
	const [isSendingData, setIsSendingData] = useState<boolean>(false);
	const [serverResponse, setServerResponse] = useState<string>("");

	const isImage = async (url: string) => {
		const http = new XMLHttpRequest();
		try {
			http.open("HEAD", url, false);
			http.send();
			const res = http.status != 404;
			setData({ ...data, isValidURL: res });
		} catch {
			setData({ ...data, isValidURL: false });
		}
	};
	useEffect(() => {
		isImage(data.imageURL);
	}, [data.imageURL]);

	const handleSubmit = async () => {
		setIsSendingData(true);
		const config = {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				email: currentInfo.email,
				imageURL: data.imageURL !== "" ? data.imageURL : currentInfo.imageURL,
				description: data.description !== "" ? data.description : currentInfo.description
			})
		};
		const res = await fetch("/api/profile", config);
		if (res.status !== 200) {
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
					isValidValue={data.isValidURL}
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
				<SubmitButton
					disabled={(data.imageURL === "" && data.description === "") || isSendingData}
					updater={handleSubmit}
					text="Update your Info"
				/>
			</div>
		</div>
	);
}
