import { getUserLoggedIn } from "./getLoggedInUserFromStorage";

export const isLoggedIn = () => {
	const user = getUserLoggedIn();
	if (user) {
		return true;
	} else {
		return false;
	}
};
