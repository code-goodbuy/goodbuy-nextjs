import { Dispatch, SetStateAction } from "react";
import { UserInfoType } from "./HelperTypes";

export interface UpdaterType {
	stateUpdater: Dispatch<SetStateAction<boolean>>;
	currentInfo: UserInfoType;
}
