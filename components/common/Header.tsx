import Link from "next/link";
import { useContext } from "react";
import { UIContext } from "../../lib/context/UIContext";
import NavLinks from "./NavLinks";

export default function Header() {
	const { showMenu, toggleShowMenu } = useContext(UIContext);
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

				<NavLinks className="space-x-4 hidden sm:flex flex-row" />
			</div>
			{showMenu && (
				<div>
					<NavLinks className="sm:hidden flex-vertical items-center space-y-4 mb-4 normal-text z-50" />
				</div>
			)}
		</header>
	);
}
