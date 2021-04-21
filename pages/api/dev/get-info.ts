import type { NextApiRequest, NextApiResponse } from "next";

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject) => {
		const data = {
			followers: "50",
			following: "70",
			numberOfScannedProducts: "30",
			userID: "mockUserId",
			description: "I like using goodbuy",
			imageURL: "/public/pics/face.png"
		};
		resolve();
		res.status(200).send(data);
	});
}
