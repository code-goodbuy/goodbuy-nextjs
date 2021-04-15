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

export const decodeJWT = (newJWT: string): JWTPayloadType | Error => {
	if (!isExpiredJWT(newJWT)) {
		return jwt_decode<JWTPayloadType>(newJWT);
	}
	throw new Error("Invalid / Expired JWT");
};
