export const getLoggedInUserFromStorage = () => {
	const user = window.localStorage.getItem("user");
	const parsedUser = JSON.parse(user);
	return parsedUser;
};
