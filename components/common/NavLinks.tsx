import { useContext } from "react";
import { AuthContext } from "../../lib/context/AuthContext";
import ColorModeButton from "./ColorModeButton";
import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";
import SectionLink from "./SectionLink";

export default function NavLinks({ className }: { className: string }) {
	const { isLoggedIn, isAuthenticating, userInfo } = useContext(AuthContext);
	if (!isAuthenticating && isLoggedIn !== undefined) {
		if (isLoggedIn) {
			return (
				<div className={className}>
					<ColorModeButton />
					<SectionLink id={"/user/" + userInfo?.username} text={"Profile"} />
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
