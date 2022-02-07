import axios from "axios";

export const getFriendsData = async (loggedInUser) => {
	// // const userName = loggedInUser.userName;
	// console.log("userName", loggedInUser);

	const loggedInUserID = loggedInUser.id;

	const friendsData = await axios
		.get(`${process.env.REACT_APP_API_URL}/users/${loggedInUserID}/friends`)
		.then((result) => {
			console.log("result get friendsdata", result.data);
			return result.data;
		})
		.catch((e) => console.log("error getfriendsData", e));
	console.log("friendsdata getfriendsdata", friendsData);
	return friendsData;
};
