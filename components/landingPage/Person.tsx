import Image from "next/image";
import { PersonType } from "../../lib/types/HelperTypes";

export default function Person({ fullName, role, url, path }: PersonType) {
	/**
	 * Person Component With Phote, Name, And Roles
	 *
	 * Props:
	 * fullName: string;
	 * role: string;
	 * url: string, valid URL to linkedin profile;
	 * path: string, to image in the public folder
	 */
	return (
		<div className="mx-10 lg:mx-4 xl:mx-10 flex flex-col items-center space-y-2 my-4">
			<Image className="rounded-full" src={path} alt="person" layout="intrinsic" width="100" height="100" />
			<div className="flex flex-row text-xl colorful-text font-bold">
				<h3 className="mr-2">{fullName}</h3>
				<a href={url} rel="noopener noreferrer" target="_blank">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<path
							className="fill-current colorful-text"
							d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
						/>
					</svg>
				</a>
			</div>
			<p className="normal-text">{role}</p>
		</div>
	);
}
