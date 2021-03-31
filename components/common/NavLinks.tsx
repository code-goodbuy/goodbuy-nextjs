import Link from "next/link";
import { useContext } from "react";
import { UIContext } from "../../lib/context/UIContext";
import { AuthContext } from "../../lib/context/AuthContext";

export default function NavLinks({ className }: { className: string }) {
	/**
	 * Landing Page Nav Links
	 */
	const { toggleColorMode, colorMode } = useContext(UIContext);
	const { isLoggedIn, toggleIsLoggedIn, isAuthenticating, changeIsAuthenticating } = useContext(
		AuthContext
	);
	if (!isAuthenticating) {
		if (isLoggedIn) {
			return (
				<div className={className}>
					<p
						onClick={toggleColorMode}
						data-testid="colorSwitcher"
						className="hover:text-primary dark:hover:text-secondary cursor-pointer"
					>
						{colorMode === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
					</p>
					<button
						className="colorful-button"
						onClick={() => {
							fetch(window.location.protocol + "//" + window.location.host + "/api/logout", {
								method: "POST",
								headers: {
									"Content-Type": "application/json"
								}
							})
								.then(() => {
									toggleIsLoggedIn && toggleIsLoggedIn();
								})
								.catch((e) => console.error(e));
						}}
					>
						Log Out
					</button>
				</div>
			);
		} else {
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

					<Link href="/auth">
						<button
							className="colorful-button"
							onClick={() => {
								changeIsAuthenticating && changeIsAuthenticating(true);
							}}
						>
							Log In
						</button>
					</Link>
				</div>
			);
		}
	} else {
		return (
			<div className={className}>
				<p
					onClick={toggleColorMode}
					data-testid="colorSwitcher"
					className="hover:text-primary dark:hover:text-secondary cursor-pointer"
				>
					{colorMode === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
				</p>
			</div>
		);
	}
}
