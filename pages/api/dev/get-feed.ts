import type { NextApiRequest, NextApiResponse } from "next";

export default function route(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	return new Promise((resolve, reject) => {
		const data = {
			posts: [
				{
					title: "Lindt Excellence Noir 85% 100 g",
					EAN: "3046920022606",
					country: "France",
					likes: 6,
					imageURL: "/pics/face.png",
					username: "spiralshape"
				},
				{
					title: "Penne Rigate Barilla",
					EAN: "8076802085738",
					country: "Italy",
					likes: 16,
					imageURL: "/pics/bear.jpg",
					username: "pandafishrye"
				},
				{
					title: "Coca Cola",
					EAN: "5000112581508",
					country: "United Kingdom",
					likes: 20,
					imageURL: "/pics/CODE.png",
					username: "ryecheetah"
				},
				{
					title: "Arrowhead Water",
					EAN: "	0071142933631",
					country: "United States & Canada",
					likes: 8,
					imageURL: "/pics/lightLogo.png",
					username: "blueeagle"
				},
				{
					title: "Nutella",
					EAN: "9782263060632",
					country: "Italy",
					likes: 12,
					imageURL: "/pics/face.png",
					username: "owlranmiregg"
				},
				{
					title: "Pringles Original savoury snack",
					EAN: "	5410076602384",
					country: "Belgium & Luxembourg",
					likes: 22,
					imageURL: "/pics/darkLogo.png",
					username: "snowantviola"
				}
			]
		};
		resolve();
		res.status(200).send(data);
	});
}
