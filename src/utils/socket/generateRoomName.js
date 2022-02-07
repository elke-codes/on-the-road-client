export const generateRoomName = (loggedInUserId, selectedUserId, setRoom) => {
	const idPair = [loggedInUserId, selectedUserId];
	const sorted = idPair.sort();
	const roomName = sorted.join("");
	console.log("roomName generateRoomName", roomName);
	console.log("loggedinuserid genreateroomname", loggedInUserId);
	return roomName;
};
