import Link from "next/link";
import { useContext } from "react";
import { UIContext } from "../../lib/context/UIContext";

export default function Header() {
	const { showMenu, toggleShowMenu, toggleColorMode } = useContext(UIContext);
	return (
		<header className="fixed inset-x-0 normal-bg border-b-2 colorful-border">
			<div className="normal-text flex-horizontal justify-between items-center px-4 py-1">
				<h2 className="text-3xl colorful-text font-bold">GoodBuy</h2>
				<button onClick={toggleShowMenu} className="sm:hidden colorful-button text-white px-5">
					Menu
				</button>
				<div className="space-x-4 hidden sm:flex flex-row">
					<p
						onClick={toggleColorMode}
						className="hover:text-primary dark:hover:text-secondary cursor-pointer"
					>
						Toggle Dark Mode
					</p>
					<p className="hover:text-primary dark:hover:text-secondary">
						<Link href="">Item</Link>
					</p>
					<p className="hover:text-primary dark:hover:text-secondary">
						<Link href="">Item</Link>
					</p>
					<p className="hover:text-primary dark:hover:text-secondary">
						<Link href="">Item</Link>
					</p>
				</div>
			</div>
			{showMenu && (
				<div className="sm:hidden flex-vertical items-center space-y-4 mb-4 normal-text">
					<p onClick={toggleColorMode} className="hover:text-primary dark:hover:text-secondary">
						Toggle Dark Mode
					</p>
					<p className="hover:text-primary dark:hover:text-secondary">
						<Link href="">Item</Link>
					</p>
					<p className="hover:text-primary dark:hover:text-secondary">
						<Link href="">Item</Link>
					</p>
					<p className="hover:text-primary dark:hover:text-secondary">
						<Link href="">Item</Link>
					</p>
				</div>
			)}
		</header>
	);
}
