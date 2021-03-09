import Link from "next/link";
import { useContext } from "react";
import { UIContext } from "../../lib/context/UIContext";

export default function NavLinks({ className }: { className: string }) {
	const { toggleColorMode, colorMode } = useContext(UIContext);
	return (
		<div className={className}>
			<p
				onClick={toggleColorMode}
				data-testid="colorSwitcher"
				className="hover:text-primary dark:hover:text-secondary cursor-pointer"
			>
				{colorMode === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
			</p>
			<p className="hover:text-primary dark:hover:text-secondary">
				<Link href="#mission">Our Mission</Link>
			</p>
			<p className="hover:text-primary dark:hover:text-secondary">
				<Link href="#about">About</Link>
			</p>
			<button className="colorful-button">Log In</button>
		</div>
	);
}
