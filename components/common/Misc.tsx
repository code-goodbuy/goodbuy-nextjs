export function ProfilePic({ imageURL }: { imageURL: string }) {
	return (
		<div
			className="rounded-full border-4 colorful-border square-50 img-bg"
			style={{ backgroundImage: "url(" + imageURL + ")" }}
		></div>
	);
}
