import type { NextApiRequest, NextApiResponse } from "next";

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject) => {
		const data = {
			suggestions: [
				{
					scannedProducts: 56,
					imageURL: "/pics/face.png",
					username: "octagon"
				},
				{
					scannedProducts: 22,
					imageURL: "/pics/darkLogo.png",
					username: "notafish"
				},
				{
					scannedProducts: 20,
					imageURL: "/pics/bear.jpg",
					username: "realpolarbear"
				},
				{
					scannedProducts: 16,
					imageURL: "/pics/CODE.png",
					username: "username0"
				},
				{
					scannedProducts: 107,
					imageURL: "/pics/lightLogo.png",
					username: "butterfly"
				}
			]
		};
		resolve();
		res.status(200).send(data);
	});
}
