import Image from "next/image";
import { useContext } from "react";
import { UIContext } from "../../lib/context/UIContext";
import NavLinks from "./NavLinks";

export default function Header() {
	/**
	 * Responsive Header Component
	 */
	const { showMenu, toggleShowMenu, colorMode } = useContext(UIContext);
	return (
		<header className="fixed inset-x-0 normal-bg border-b-2 colorful-border z-50 p-2">
			<div className="normal-text flex-horizontal justify-between items-center px-4 py-1">
				<div className="flex flex-row items-center">
					<Image
						src={colorMode === "dark" ? "/pics/darkLogo.png" : "/pics/lightLogo.png"}
						layout="fixed"
						height={40}
						width={40}
						alt="logo"
					/>

					<h2 className="ml-3 text-3xl lg:text-4xl colorful-text font-bold">GoodBuy</h2>
				</div>
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
