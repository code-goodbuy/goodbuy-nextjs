import Link from "next/link";
import { useContext } from "react";
import { UIContext } from "../../lib/context/UIContext";

export default function Header() {
	const { showMenu, toggleShowMenu, toggleColorMode, colorMode } = useContext(UIContext);
	return (
		<header className="fixed inset-x-0 normal-bg border-b-2 colorful-border z-50">
			<div className="normal-text flex-horizontal justify-between items-center px-4 py-1">
				<h2 className="text-3xl lg:text-4xl colorful-text font-bold">GoodBuy</h2>
				<button
					onClick={toggleShowMenu}
					className="sm:hidden colorful-button px-5"
					data-testid="menu"
				>
					Menu
				</button>
				<div className="space-x-4 hidden sm:flex flex-row">
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
					<p className="hover:text-primary dark:hover:text-secondary">
						<Link href="/">Item</Link>
					</p>
				</div>
			</div>
			{showMenu && (
				<div className="sm:hidden flex-vertical items-center space-y-4 mb-4 normal-text z-50">
					<p
						onClick={toggleColorMode}
						data-testid="colorSwitcher"
						className="hover:text-primary dark:hover:text-secondary"
					>
						{colorMode === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
					</p>
					<p className="hover:text-primary dark:hover:text-secondary">
						<Link href="#mission">Our Mission</Link>
					</p>
					<p className="hover:text-primary dark:hover:text-secondary">
						<Link href="#about">About</Link>
					</p>
					<p className="hover:text-primary dark:hover:text-secondary">
						<Link href="/">Item</Link>
					</p>
				</div>
			)}
		</header>
	);
}
