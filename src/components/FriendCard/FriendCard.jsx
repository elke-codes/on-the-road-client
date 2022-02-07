/// --- FRIENDINFO.JSX --- ///

import "./FriendCard.scss";
import { distanceBetweenCoordinates } from "../../utils/location/distanceBetweenCoordinates";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import DividerLine from "../DividerLine/DividerLine";
import { timeAtLocation } from "../../utils/time/timeAtLocation";

const FriendCard = ({
	friend,
	loggedInUser,
	setSelectedFriend,
	selectedFriend
}) => {
	const history = useHistory();
	// const selectedFriendLat = selectedFriend.locations[0].lat;
	// const selectedFriendLng = selectedFriend.locations[0].lng;
	const [localTime, setLocalTime] = useState(null);

	const handleSelectedFriend = (friend) => {
		setSelectedFriend(friend);
		history.push("/chat");
	};

	useEffect(async () => {
		if (!friend) {
			return;
		}

		setLocalTime(
			await timeAtLocation(
				friend.locations[0].lat,
				friend.locations[0].lng
			)
		);
	});

	return (
		<section className="friend">
			<article className="friend-card">
				<div className="friend-card__user">
					<Avatar />
					<p className="friend-card__user-name">@{friend.userName}</p>
				</div>

				<DividerLine />
				<p className="friend-card__name">
					{friend.firstName} {friend.lastName}
				</p>

				<p className="friend-card__location">
					{friend.locations[0].city}, {friend.locations[0].country}
				</p>
				<br />
				<p className="friend-card__distance">
					We're{" "}
					{/* https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates */}
					<span className="friend-card__distance--bold">
						{distanceBetweenCoordinates(
							friend.locations[0].lat,
							friend.locations[0].lng,
							loggedInUser.locations[0].lat,
							loggedInUser.locations[0].lng
						)}{" "}
						km
					</span>{" "}
					apart!
				</p>

				<p className="friend-card__time">
					It's{" "}
					<span className="friend-card__time--bold">{localTime}</span>{" "}
					here
				</p>

				<button
					className="friend-card__chat-button"
					onClick={() => {
						handleSelectedFriend(friend);
					}}>
					{" "}
					Chat with me!
				</button>

				<div className="friend-card__bottom-container"></div>
			</article>
		</section>
	);
};

export default FriendCard;
