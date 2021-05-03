import { decodeJWT, isValidJWT } from "../../lib/apiFunctions/jwtHelpers";

describe("test API logic", () => {
	it("should return an object from a valid token", () => {
		// given + when
		const res = decodeJWT(
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC50ZXN0IiwiaWF0IjoxNjE2NzUwOTA3LCJleHAiOjQwMDAwMDAwMDAsImp0aSI6IjZlMDA3MTJmLTIxOTYtNGJjYS1iMzhmLTQ4MTFkOGI5MTAxOSJ9.hHvO7GQk4cqU1fL8-Ec6u7IFfpmBxMfNGsLKUqLeS64"
		);
		// then
		expect(res).toStrictEqual({
			"email": "test@test.test",
			"exp": 4000000000,
			"iat": 1616750907,
			"jti": "6e00712f-2196-4bca-b38f-4811d8b91019"
		});
	});

	it("should return false from an invalid token", () => {
		// given + when
		const res = isValidJWT("notAJwtToken");
		//then
		expect(res).toBe(false);
	});

	it("shouhld throw an error from an invalid token", () => {
		//given
		let res = "";
		//when
		try {
			decodeJWT("not a token");
		} catch (e) {
			res = e.toString();
		}
		// then
		expect(res).toBe("Error: Invalid / Expired JWT");
	});
});
