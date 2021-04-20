import Link from "next/link";

export default function SectionLink({ text, id }: { text: string; id: string }) {
	return (
		<button className="hover:text-primary dark:hover:text-secondary">
			<Link href={id}>{text}</Link>
		</button>
	);
}
