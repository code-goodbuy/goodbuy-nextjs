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
			description: "Hi! you are reading my description 📓! I like using GoodBuy 😀. I care about the environment 🌳.",
			imageURL: "/pics/face.png",
			listOfScanned: [
				{ title: "Lindt Excellence Noir 85% 100 g", EAN: "3046920022606", country: "France", likes: 6 },
				{ title: "Penne Rigate Barilla", EAN: "8076802085738", country: "Italy", likes: 16 },
				{ title: "Coca Cola", EAN: "5000112581508", country: "United Kingdom", likes: 20 },
				{ title: "Arrowhead Water", EAN: "	0071142933631", country: "United States & Canada", likes: 8 },
				{ title: "Nutella", EAN: "9782263060632", country: "Italy", likes: 12 },
				{ title: "Pringles Original savoury snack", EAN: "	5410076602384", country: "Belgium & Luxembourg", likes: 22 }
			]
		};
		resolve();
		res.status(200).send(data);
	});
}
