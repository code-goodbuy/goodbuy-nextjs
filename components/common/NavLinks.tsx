import { useContext } from "react";
import { AuthContext } from "../../lib/context/AuthContext";
import ColorModeButton from "./ColorModeButton";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";
import SectionLink from "./SectionLink";

export default function NavLinks({ className }: { className: string }) {
	const { isLoggedIn, isAuthenticating } = useContext(AuthContext);
	if (!isAuthenticating) {
		if (isLoggedIn) {
			return (
				<div className={className}>
					<ColorModeButton />
					<LogOutButton />
				</div>
			);
		} else {
			return (
				<div className={className}>
					<ColorModeButton />
					<SectionLink id={"#mission"} text={"Our Mission"} />
					<SectionLink id={"#about"} text={"About"} />
					<LogInButton />
				</div>
			);
		}
	} else {
		return (
			<div className={className}>
				<ColorModeButton />
			</div>
		);
	}
}
