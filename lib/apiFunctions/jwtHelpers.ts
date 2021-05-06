import jwt_decode from "jwt-decode";
import { JWTPayloadType } from "../../lib/types/HelperTypes";

export const isValidJWT = (token: string): boolean => {
	try {
		jwt_decode<JWTPayloadType>(token);
		return true;
	} catch {
		return false;
	}
};

export const isExpiredJWT = (token: string): boolean => {
	if (!isValidJWT(token)) return true;
	const { exp } = jwt_decode<JWTPayloadType>(token);
	if (exp && exp * 1000 >= Date.now()) return false;
	return true;
};

export const decodeJWT = (token: string): JWTPayloadType | Error => {
	if (!isExpiredJWT(token)) {
		return jwt_decode<JWTPayloadType>(token);
	}
	throw new Error("Invalid / Expired JWT");
};

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
		if (!isValidJWT(this.token)) return true;
		const { exp } = jwt_decode<JWTPayloadType>(this.token);
		if (exp && exp * 1000 >= Date.now()) return false;
		return true;
	}

	decode(): JWTPayloadType | Error {
		if (!isExpiredJWT(this.token)) {
			return jwt_decode<JWTPayloadType>(this.token);
		}
		throw new Error("Invalid / Expired JWT");
	}
}
