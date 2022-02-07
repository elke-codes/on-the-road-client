/// --- FRIENDINFO.JSX --- ///

import "./FriendCardCopy.scss";
import { distanceBetweenCoordinates } from "../../utils/location/distanceBetweenCoordinates";
import React, { useEffect, useState } from "react";
import Avatar from "../Avatar/Avatar";
import DividerLine from "../DividerLine/DividerLine";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { timeAtLocation } from "../../utils/time/timeAtLocation";

const FriendCardCopy = ({ loggedInUser, selectedFriend }) => {
	const selectedFriendLat = selectedFriend.locations[0].lat;
	const selectedFriendLng = selectedFriend.locations[0].lng;
	const [center, setCenter] = useState([
		selectedFriend.locations[0].lat,
		selectedFriend.locations[0].lng
	]);
	const [localTime, setLocalTime] = useState(null);

	useEffect(async () => {
		if (!selectedFriend) {
			return;
		}
		setCenter([selectedFriendLat, selectedFriendLng]);

		setLocalTime(
			await timeAtLocation(selectedFriendLat, selectedFriendLng)
		);
	}, [selectedFriend]);

	// https://stackoverflow.com/questions/64665827/react-leaflet-center-attribute-does-not-change-when-the-center-state-changes
	const zoom = 10;
	const ChangeView = ({ center }) => {
		const map = useMap();
		map.setView(center);
		return null;
	};

	// console.log(center);
	console.log("localtime", localTime);
	return (
		<div class="card text-center shadow-2xl">
			<MapContainer
				className="card__mini-map"
				center={center}
				zoom={10}
				scrollWheelZoom={true}
				id="inlineFrameExample"
				title="Inline Frame Example"
				width="300"
				height="200">
				<ChangeView center={center} />

				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</MapContainer>
			{/* )} */}

			<div class="card-body">
				<div className="card-title__wrapper">
					<Avatar />
					<h2 class="card-title">@{selectedFriend.userName} </h2>
				</div>
				<DividerLine />
				<p className="card__name">
					{selectedFriend.firstName} {selectedFriend.lastName}
				</p>

				{/* https://myprojects.geoapify.com/api/Uvf0Dk1JqGJgrI0OCWvD/keys */}
				<p className="card__location">
					{selectedFriend.locations[0].city},
					{selectedFriend.locations[0].country}
				</p>
				<p className="card__distance">
					We're{" "}
					{/* https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates */}
					<span className="card__distance--bold">
						{distanceBetweenCoordinates(
							selectedFriend.locations[0].lat,
							selectedFriend.locations[0].lng,
							loggedInUser.locations[0].lat,
							loggedInUser.locations[0].lng
						)}
						km
					</span>{" "}
					apart!
				</p>
				{localTime && (
					<p className="card__time">
						It's{" "}
						<span className="card__time--bold">{localTime}</span>{" "}
						here
					</p>
				)}
			</div>
		</div>
	);
};

export default FriendCardCopy;
