/// --- TIME AT LOCATION --- ///

import axios from "axios";
// TODO ENV
const API_KEY = process.env.REACT_APP_TIMEZONEDB_API_KEY;

export const timeAtLocation = async (selectedFriendLat, selectedFriendLng) => {
	const localTime = await axios
		.get(
			`http://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=position&lat=${selectedFriendLat}&lng=${selectedFriendLng}`
		)
		.then((result) => {
			const formatted = result.data.formatted;
			const localTimeString = new Date(formatted).toLocaleTimeString(
				"en-US",
				{
					hour: "2-digit",
					minute: "2-digit"
				}
			);
			return localTimeString;
		});

	return localTime;
	// .catch((err) => console.log(err));
};
