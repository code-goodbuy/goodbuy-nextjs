import Image from "next/image";
import { PictureType } from "../../lib/types/CommonTypes";

export default function Picture({ source, alt, isLarge, author, authorLink, rotation = "right" }: PictureType) {
	return (
		<figure
			className={`picture ${isLarge ? "large-pic" : "normal-pic"} ${
				rotation === "right" ? "xl:rotate-12" : "xl:-rotate-12"
			}`}
		>
			<Image
				className="rounded-3xl"
				src={source}
				alt={alt}
				layout="intrinsic"
				width={isLarge ? 600 : 450}
				height={isLarge ? 400 : 300}
			/>
			<figcaption className="text-white">
				<span>
					Photo by{" "}
					<a className="underline" href={authorLink}>
						{author}
					</a>
				</span>
			</figcaption>
		</figure>
	);
}
