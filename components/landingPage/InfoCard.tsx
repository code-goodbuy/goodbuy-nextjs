import { InfoCardType } from "../../lib/types/HelperTypes";

function dayOfTheYear() {
	return (
		(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) -
			Date.UTC(new Date().getFullYear(), 0, 0)) /
		24 /
		60 /
		60 /
		1000
	);
}
function isLeapYear(year: number) {
	return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}
export function getPartialNumber(number: number) {
	/**
	 * returns the proportion of the total number like so [number : days of the year = x : current day]
	 */
	//the precision is set to the hour
	const partialRawNumber =
		Math.floor(dayOfTheYear() * number * 24 + new Date().getHours()) /
		(isLeapYear(new Date().getFullYear()) ? 365 * 24 : 366 * 24);
	return parseInt(partialRawNumber.toFixed(0)).toLocaleString();
}

export default function InfoCard({ number, unit, text, url }: InfoCardType) {
	return (
		<div className="rounded-2xl ring-2 ring-primary dark:ring-secondary p-5 w-75 md:w-50 lg:w-30 mt-10">
			<h2 className="text-2xl font-bold colorful-text">
				{getPartialNumber(number)} {unit}
			</h2>
			<p className="normal-text mb-8">{text}</p>
			<a className="colorful-button cursor-pointer py-1" rel="noopener noreferrer" href={url} target="_blank">
				Learn More
			</a>
		</div>
	);
}
