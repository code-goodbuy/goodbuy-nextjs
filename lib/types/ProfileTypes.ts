import { Dispatch, SetStateAction } from "react";
import { UserInfoType } from "./HelperTypes";

export interface UpdaterType {
	stateUpdater: Dispatch<SetStateAction<boolean>>;
	currentInfo: UserInfoType;
}

export interface ScannedElement {
	title: string;
	EAN: string;
	country: string;
	likes: number;
}

export interface ProfileDataType {
	message?: string;
	imageURL: string;
	scannedProducts?: number;
	followers: number;
	following: number;
	description: string;
	listOfScanned: ScannedElement[];
}

export interface UpdateType {
	imageURL: string;
	description: string;
	isValidURL: boolean;
}
