import { useContext } from "react";
import { AuthContext } from "../../lib/context/AuthContext";

export default function LogOutButton() {
	const { toggleIsLoggedIn } = useContext(AuthContext);
	return (
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
	);
}
