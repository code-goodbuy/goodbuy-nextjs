import jwt_decode from "jwt-decode";
import { JWTPayloadType } from "../../lib/types/HelperTypes";

export class JWTHelper {
	token: string;

	constructor(token: string) {
		this.token = token;
	}

	isValid(): boolean {
		try {
			jwt_decode<JWTPayloadType>(this.token);
			return true;
		} catch {
			return false;
		}
	}

	isExpired(): boolean {
		if (!this.isValid()) return true;
		const { exp } = jwt_decode<JWTPayloadType>(this.token);
		if (exp && exp * 1000 >= Date.now()) return false;
		return true;
	}

	decode(): JWTPayloadType | Error {
		if (!this.isExpired()) {
			return jwt_decode<JWTPayloadType>(this.token);
		}
		throw new Error("Invalid / Expired JWT");
	}
}
