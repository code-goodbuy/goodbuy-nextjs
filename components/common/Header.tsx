import Link from "next/link";
import { useContext } from "react";
import { UIContext } from "../../lib/context/UIContext";

export default function Header() {
	const { showMenu, toggleShowMenu } = useContext(UIContext);
	return (
		<header className="fixed inset-x-0 normal-bg border-b-2 colorful-border">
			<div className="normal-text flex-horizontal justify-between items-center px-4 py-1">
				<h2 className="text-3xl colorful-text font-bold">GoodBuy</h2>
				<button onClick={toggleShowMenu} className="sm:hidden colorful-button text-white px-5">
					Menu
				</button>
				<div className="space-x-4 hidden sm:flex flex-row">
					<Link href="">Item</Link>
					<Link href="">Item</Link>
					<Link href="">Item</Link>
				</div>
			</div>
			{showMenu && (
				<div className="sm:hidden flex-vertical items-center space-y-4 mb-4 colorful-text">
					<Link href="">Item</Link>
					<Link href="">Item</Link>
					<Link href="">Item</Link>
				</div>
			)}
		</header>
	);
}
