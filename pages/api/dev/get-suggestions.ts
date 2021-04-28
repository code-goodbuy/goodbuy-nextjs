import type { NextApiRequest, NextApiResponse } from "next";

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject) => {
		const data = {
			suggestions: [
				{
					scannedProducts: 56,
					imageURL: "/pics/face.png",
					username: "spiralshape"
				},
				{
					scannedProducts: 20,
					imageURL: "/pics/bear.jpg",
					username: "pandafishrye"
				},
				{
					scannedProducts: 16,
					imageURL: "/pics/CODE.png",
					username: "ryecheetah"
				},
				{
					scannedProducts: 107,
					imageURL: "/pics/lightLogo.png",
					username: "blueeagle"
				},
				{
					scannedProducts: 71,
					imageURL: "/pics/face.png",
					username: "owlranmiregg"
				},
				{
					scannedProducts: 22,
					imageURL: "/pics/darkLogo.png",
					username: "snowantviola"
				}
			]
		};
		resolve();
		res.status(200).send(data);
	});
}
