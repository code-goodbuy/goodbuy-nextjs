import { Dispatch, SetStateAction } from "react";

export const setIsValidURL = async (url: string, updater: Dispatch<SetStateAction<any>>, data: any) => {
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
