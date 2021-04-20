import type { PageConfig } from "next";

export const apiConfig: PageConfig = {
	api: {
		bodyParser: false //don't parse the whole request, so we can forward it to the backend
	}
};
