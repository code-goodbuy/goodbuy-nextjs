import "@testing-library/jest-dom";
import { decodeJWT } from "../../lib/apiFunctions/jwtHelpers";

describe("test API logic", () => {
	it("should return an object", () => {
		const res = decodeJWT(
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC50ZXN0IiwiaWF0IjoxNjE2NzUwOTA3LCJleHAiOjQwMDAwMDAwMDAsImp0aSI6IjZlMDA3MTJmLTIxOTYtNGJjYS1iMzhmLTQ4MTFkOGI5MTAxOSJ9.hHvO7GQk4cqU1fL8-Ec6u7IFfpmBxMfNGsLKUqLeS64"
		);
		expect(res).toStrictEqual({
			"email": "test@test.test",
			"exp": 4000000000,
			"iat": 1616750907,
			"jti": "6e00712f-2196-4bca-b38f-4811d8b91019"
		});
	});
	it("shouhld throw an error", () => {
		let res = "";
		try {
			decodeJWT("not a token");
		} catch (e) {
			res = e.toString();
		}
		expect(res).toBe("Error: Invalid / Expired JWT");
	});
});
