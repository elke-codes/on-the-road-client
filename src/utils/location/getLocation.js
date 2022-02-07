export const getLocation = () => {
	if (!navigator.geolocation) {
		alert("Sorry, geolocation is not supported by your browser");
	} else {
		// wait to get lat and lng then return object with coords
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					resolve({
						lat: position.coords.latitude,
						lng: position.coords.longitude
					});
				},
				() => {
					reject("Unable to retrieve your location");
				}
			);
		});
	}
};
