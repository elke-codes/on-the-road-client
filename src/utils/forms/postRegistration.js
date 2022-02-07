import { getLocation } from "../location/getLocation";
import { reverseGeoCodeLocation } from "../location/reverseGeoCodeLocation";
import { setLoggedInUserIntoStorage } from "../users/setLoggedInUserIntoStorage";
import axios from "axios";

export const postRegistration = async (e) => {
	//await coords to be gotten from geolocation
	// console.log("post reg e.target", e.target.locationPermission.value);
	//TODO check if locationpermission was given, if not return null for lat lng city and country else return what s below
	const coords = await getLocation();
	// console.log("from PostReg", coords);
	const reversedGeoCode = await reverseGeoCodeLocation(coords);

	// console.log("e.target.userName.value", e.target.userName.value);
	const response = await axios.post(
		`${process.env.REACT_APP_API_URL}/users/register`,
		{
			userName: e.target.userName.value,
			firstName: e.target.firstName.value,
			lastName: e.target.lastName.value,
			email: e.target.email.value,
			lat: coords.lat,
			lng: coords.lng,
			city: reversedGeoCode.data.addresses[0].address.municipality,
			country: reversedGeoCode.data.addresses[0].address.country,
			password: e.target.password.value
		}
	);
	setLoggedInUserIntoStorage(response.data);
	console.log(response.data);

	return response.data;
};
