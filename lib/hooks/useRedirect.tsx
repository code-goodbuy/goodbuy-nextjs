import { useEffect } from "react";
import { useRouter } from "next/router";

const useRedirect = (condition: boolean, dependencies: any[] = [], path = "/") => {
	const router = useRouter();
	return useEffect(() => {
		if (condition) {
			router.push(path);
		}
	}, dependencies);
};

export default useRedirect;
