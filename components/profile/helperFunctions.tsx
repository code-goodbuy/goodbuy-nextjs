import { Dispatch, SetStateAction } from "react";
import { UserInfoType } from "../../lib/types/HelperTypes";

export const setIsValidURL = async (url: string, updater: Dispatch<SetStateAction<any>>, data: UserInfoType) => {
	const http = new XMLHttpRequest();
	try {
		http.open("HEAD", url, false);
		http.send();
		const res = http.status != 404;
		updater({ ...data, isValidURL: res });
	} catch {
		updater({ ...data, isValidURL: false });
	}
};

export const sendChangeRequest = async (currentInfo: UserInfoType, data: UserInfoType) => {
	const config = {
		method: "PUT",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			_id: currentInfo._id,
			imageURL: data.imageURL !== "" ? data.imageURL : currentInfo.imageURL,
			description: data.description !== "" ? data.description : currentInfo.description
		})
	};
	const res = await fetch("/api/profile", config);
	if (res.status !== 200) {
		return { "message": "Error" };
	} else {
		return { "message": "OK" };
	}
};

export const isDisabledForm = (
	isSending: boolean,
	d: { description: string; imageURL: string; isValidURL: boolean }
) => {
	if (isSending || (d.imageURL === "" && d.description === "")) {
		return true;
	}
	if (d.description !== "" && d.description.length > 256) {
		return true;
	}
	if (d.imageURL && (!d.isValidURL || d.imageURL.length < 7)) {
		return true;
	}
	return false;
};
