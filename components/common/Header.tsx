import Image from "next/image";
import { useContext } from "react";
import { UIContext } from "../../lib/context/UIContext";
import NavLinks from "./NavLinks";
import Link from "next/link";

export default function Header() {
	const { showMenu, toggleShowMenu, colorMode } = useContext(UIContext);

	return (
		<header className="fixed inset-x-0 normal-bg border-b-2 colorful-border z-50 p-2">
			<div className="normal-text flex-horizontal justify-between items-center px-4 py-1">
				<Link href="/">
					<div className="flex flex-row items-center cursor-pointer">
						<Image
							src={colorMode === "dark" ? "/pics/darkLogo.png" : "/pics/lightLogo.png"}
							layout="fixed"
							height={40}
							width={40}
							alt="logo"
						/>

						<h2 className="ml-3 text-3xl lg:text-4xl colorful-text font-bold">GoodBuy</h2>
					</div>
				</Link>
				<button onClick={toggleShowMenu} className="md:hidden colorful-button px-5" data-testid="menu">
					Menu
				</button>

				<NavLinks className="space-x-4 hidden md:flex flex-row" />
			</div>
			{showMenu && (
				<div>
					<NavLinks className="md:hidden flex-vertical items-center space-y-4 mb-4 normal-text z-50" />
				</div>
			)}
		</header>
	);
}
