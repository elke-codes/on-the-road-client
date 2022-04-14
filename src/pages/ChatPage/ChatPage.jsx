/// --- CHATPAGE.JSX --- ///

import "./ChatPage.scss";
import React, { useEffect, useState } from "react";

import ChatBox from "../../components/ChatBox/ChatBox";

import socket from "../../utils/socket/socket-client";
import Inbox from "../../components/Inbox/Inbox";
import Footer from "../../components/Footer/Footer";
import Register from "../../components/Register/Register";
import FriendCardCopy from "../../components/FriendCardCopy/FriendCardCopy";

import Modal from "../../components/Modal/Modal";

// // establish connection to backend
// // link to where running socket.io server
// // SERVER_URL

const ChatPage = ({
	loggedInUser,
	friendsData,
	selectedFriend,
	setSelectedFriend,
	room,
	setRoom,
	setLoggedInUser
}) => {
	const [register, setRegister] = useState(false);
	const [showModal, setShowModal] = useState(false);
	console.log("server url,", process.env.REACT_APP_SOCKET_SERVER_URL);

	// when there s a logged in user connect
	useEffect(() => {
		if (!loggedInUser) {
			return;
		}
		// TODO ? socket.auth = { userName: loggedInUser.userName };
		// console.log(socket.auth);
		socket.connect();

		//get messages and display them in the chatroom when a user logs in.
	}, [loggedInUser]);

	return (
		<>
			<main className="chat-page">
				{!loggedInUser && !register && (
					<>
						<div className="chat-page__not-logged-in">
							<h2 className="chat-page__copy">
								Please log in to continue...
							</h2>
							<div className="chat-page__buttons">
								<button
									// className="chat-page__button"
									className="btn btn-sm btn-success mr-4"
									onClick={() => setRegister(true)}>
									Register
								</button>
								<button className="btn btn-primary btn-sm">
									Login
								</button>
							</div>
						</div>
					</>
				)}

				{!loggedInUser && register && (
					<Register
						setLoggedInUser={setLoggedInUser}
						className="chat-page__register"
					/>
				)}

				{loggedInUser ? (
					<>
						<div className="chat-page__inbox-mobile">
							{showModal ? (
								<Modal
									showModal={showModal}
									setShowModal={setShowModal}>
									<Inbox
										friendsData={friendsData}
										loggedInUser={loggedInUser}
										selectedFriend={selectedFriend}
										setSelectedFriend={setSelectedFriend}
										room={room}
										setRoom={setRoom}
										setShowModal={setShowModal}
									/>
								</Modal>
							) : (
								<button
									className="btn btn-sm"
									onClick={() => setShowModal(true)}>
									Show Friendlist
								</button>
							)}
						</div>

						<Inbox
							className={"inbox__tablet"}
							friendsData={friendsData}
							loggedInUser={loggedInUser}
							selectedFriend={selectedFriend}
							setSelectedFriend={setSelectedFriend}
							room={room}
							setRoom={setRoom}
							setShowModal={setShowModal}
						/>

						<ChatBox
							loggedInUser={loggedInUser}
							socket={socket}
							selectedFriend={selectedFriend}
							room={room}
							setRoom={setRoom}
							socket={socket}
						/>
						{selectedFriend && (
							<FriendCardCopy
								selectedFriend={selectedFriend}
								loggedInUser={loggedInUser}
							/>
						)}
					</>
				) : null}
			</main>
			<Footer />
		</>
	);
};

export default ChatPage;
