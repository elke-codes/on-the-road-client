export const setLoggedInUserIntoStorage = (user) => {
	const jsonUser = JSON.stringify(user);
	window.localStorage.setItem("user", jsonUser);
};
