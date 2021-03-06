import { InfoCardType } from "../../lib/types/HelperTypes";

function dayOfTheYear() {
	/**
	 * returns the current day of the year (1-366)
	 */
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
	/**
	 * checks if a year has 366 days
	 */
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
	/**
	 * Displays the amount of something since the beginning of the year.
	 *
	 * Props:
	 * number: number, [the year estimate number]
	 * unit, string, [unit of measurement]
	 * text, string, [test to display]
	 * url: stirng [the source URL]
	 */

	return (
		<div className="rounded-2xl ring-2 ring-primary dark:ring-secondary p-5 w-75 md:w-50 lg:w-30 mt-10">
			<h2 className="text-2xl font-bold colorful-text">
				{getPartialNumber(number)} {unit}
			</h2>
			<p className="normal-text mb-8">{text}</p>
			<a className="colorful-button cursor-pointer" href={url} target="_blank">
				Learn More
			</a>
		</div>
	);
}
