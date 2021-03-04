import { ReactChildrenType } from "../../lib/types/ReactChildrenType";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: ReactChildrenType) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
