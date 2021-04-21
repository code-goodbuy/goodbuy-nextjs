import type { NextApiRequest, NextApiResponse } from "next";

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject) => {
		if (req.body.user.length < 6) {
			resolve();
			res.status(404).send({ "message": "user does not exist" });
		}
		const data = {
			followers: "50",
			following: "70",
			scannedProducts: "30",
			userID: "mockUserId",
			description: "I like using GoodBuy 😀. I care about the environment 🌳.",
			imageURL: "/pics/face.png"
		};
		resolve();
		res.status(200).send(data);
	});
}
