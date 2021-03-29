import jwt_decode from "jwt-decode";
import { JWTPayloadType } from "../../lib/types/HelperTypes";

const isValidJWT = (token: string): boolean => {
	try {
		jwt_decode<JWTPayloadType>(token);
		return true;
	} catch {
		return false;
	}
};

const isExpiredJWT = (exp: number): boolean => {
	if (Date.now() >= exp * 1000) {
		return true;
	} else {
		return false;
	}
};

export const decodeJWT = (newJWT: string): JWTPayloadType | Error => {
	if (!isValidJWT(newJWT)) {
		throw new Error("Invalid / Expired JWT");
	}
	let decoded = jwt_decode<JWTPayloadType>(newJWT);
	if (decoded.exp && decoded.email && !isExpiredJWT(decoded.exp)) {
		return decoded;
	} else {
		throw new Error("Invalid / Expired JWT");
	}
};
