import { ReactChildrenType } from "../../lib/types/ReactChildrenType";
import Header from "./Header";

const Layout = ({ children }: ReactChildrenType) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default Layout;
