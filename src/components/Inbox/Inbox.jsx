/// --- INBOX.JSX --- ///

import "./Inbox.scss";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { generateRoomName } from "../../utils/socket/generateRoomName";
import SearchBar from "../SearchBar/SearchBar";
import Avatar from "../Avatar/Avatar";

const Inbox = ({
	friendsData,
	selectedFriend,
	setSelectedFriend,
	room,
	setRoom,
	loggedInUser
}) => {
	const [active, setActive] = useState(false);

	useEffect(() => {
		console.log("sel frien id", selectedFriend);
		console.log("loggedininuser inbox", loggedInUser);
		if (!selectedFriend) {
			return;
		}
		const loggedInUserID = loggedInUser.id;
		const selectedFriendID = selectedFriend.id;

		//to make sure both users end up in the same room : generate a room id that is the logged in users' id + the secelected friends' id, sorted alphabetically, to get the same result every time the room is generated, whichever of the two users opens the conversation
		setRoom(generateRoomName(loggedInUserID, selectedFriendID));

		console.log("room", room);
	}, [selectedFriend]);

	const handleSelectedFriend = (friend) => {
		console.log("loggedinuserhandeleselectedfriend", loggedInUser);
		setSelectedFriend(friend);
	};

	return (
		<>
			<section className="inbox">
				<SearchBar />

				{/* filter over people, filter out id that matches logged in id */}

				{friendsData &&
					friendsData.map((friend) => {
						return (
							<div
								key={uuid()}
								className="collapse border  border-base-300 inbox__user"
								onClick={() => {
									handleSelectedFriend(friend);
								}}>
								<input
									type="checkbox"
									className="inbox__friend-active"
								/>
								<div className="collapse-title text-xl font-medium inbox__user-identity">
									{/* <div className="avatar online">
										<div className="rounded-full w-10 h-10">
											<img src="http://daisyui.com/tailwind-css-component-profile-1@40w.png" />
										</div>
									</div> */}
									<Avatar />

									<span className="inbox__username">
										{" "}
										@{friend.userName}
									</span>
								</div>
							</div>
						);
					})}
			</section>
		</>
	);
};

export default Inbox;
