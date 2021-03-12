import { ReactChildrenType } from "../../lib/types/ReactChildrenType";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: ReactChildrenType) => {
	/**
	 * Layout Component Tht Renders Elements Common To All Pages
	 */
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
