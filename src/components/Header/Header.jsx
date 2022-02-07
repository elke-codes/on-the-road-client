/// --- HEADER.JSX --- ///
import "./Header.scss";
import React, { useState } from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import { deleteLoggedInUser } from "../../utils/users/deleteLoggedInUser";
import { getUserData } from "../../utils/users/getUserData";
import Avatar from "../Avatar/Avatar";
import axios from "axios";
import { getFriendsData } from "../../utils/users/getFriendsData";

const Header = ({ loggedInUser, setLoggedInUser, setFriendsData }) => {
	const history = useHistory();
	const [userNameInvalid, setUserNameInvalid] = useState(false);
	const [showSearchBar, setShowSearchBar] = useState(false);
	const [showFindFriendButton, setShowFindFriendButton] = useState(true);
	const [showSearchFriendButton, setShowSearchFriendButton] = useState(false);
	const [loginPasswordErrorMessage, setLoginPasswordErrorMessage] =
		useState("");
	const [loginUserNameErrorMessage, setLoginUserNameErrorMessage] =
		useState("");
	const API_URL = process.env.REACT_APP_API_URL;

	const handleLogin = async (e) => {
		e.preventDefault();

		if (!e.target.userName.value) {
			return alert("please enter your username");
		}
		axios
			.post(`${API_URL}/users/login`, {
				userName: e.target.userName.value,
				password: e.target.password.value
			})
			.then((result) => {
				console.log("result login axios", result);

				const user = getUserData(e.target.userName.value);
				// console.log("user", user);
				return user;
			})
			.then((user) => setLoggedInUser(user))
			.catch((e) => {
				// if (
				// 	e.response.data.message.toLowerCase().includes("password")
				// ) {
				// 	setLoginPasswordErrorMessage(e.response.data.message);
				// } else if (
				// 	e.response.data.message.toLowerCase().includes("username")
				// ) {
				// 	setLoginUserNameErrorMessage(e.response.data.message);
				// }
				console.log("error message", e.response.data.message, e);
			});

		// history.push("/map");
		setLoggedInUser(false);
		setLoginPasswordErrorMessage(false);
		setLoginUserNameErrorMessage(false);
	};

	const handleLogOut = () => {
		deleteLoggedInUser();
		setLoggedInUser(null);

		history.push("/");
	};

	const handleFindFriends = () => {
		setShowSearchBar(true);
		setShowSearchFriendButton(true);
		setShowFindFriendButton(false);
	};

	const handleAddFriend = async (e) => {
		e.preventDefault();
		setShowSearchBar(false);
		setShowSearchFriendButton(false);
		setShowFindFriendButton(true);

		const loggedInUserID = loggedInUser.id;
		const friendToFind = e.target.addFriend.value;
		// happening on the backend: look in db and find a user with either username or email address and return that user
		//take the user returned and add them the the loggedinusers friend array + vice versa
		await axios
			.get(`${API_URL}/users/${loggedInUserID}/${friendToFind}`)
			.then((result) => {
				//TODO modal new friend added? check out how to show modal for set amount of time and dissapear
				alert("New Friend Added!");
			});

		// getfriendsdata again to update dom with all friends including new one
		const friends = await getFriendsData(loggedInUser);
		setFriendsData(friends);
	};

	return (
		<section className="header">
			<Link to="/" className="header__title-link">
				<h1 className="header__title">wayward</h1>
			</Link>
			<nav className="header__nav">
				<NavLink
					className={"header__nav-link"}
					activeClassName={"header__nav-link--active"}
					to="/map">
					MAP
				</NavLink>
				<NavLink
					className={"header__nav-link"}
					activeClassName={"header__nav-link--active"}
					to="/chat">
					CHAT
				</NavLink>
				<NavLink
					className={"header__nav-link"}
					activeClassName={"header__nav-link--active"}
					to="/about">
					ABOUT
				</NavLink>
			</nav>
			<div className="header__logged-in">
				{loggedInUser ? (
					<>
						<div className="header__right">
							<p className="header__copy">
								{/* Welcome, {loggedInUser.userName} */}
							</p>
							<div className="header__container">
								{showFindFriendButton && (
									<button
										className="btn btn-primary btn-sm mr-2"
										onClick={handleFindFriends}>
										Find friends
									</button>
								)}
								{showSearchFriendButton && (
									<form
										action="submit"
										className="header__add-friend"
										onSubmit={async (e) => {
											await handleAddFriend(e);
										}}>
										<input
											type="text"
											name="addFriend"
											className="search"
											placeholder="search..."
										/>
										<button
											className="btn btn-primary btn-sm mr-2"
											type="submit">
											Add friend!
										</button>
									</form>
								)}
								<button
									className="btn btn-outline btn-sm mr-2"
									onClick={handleLogOut}>
									Logout
								</button>
								<Avatar />
							</div>
						</div>
					</>
				) : (
					<form className="header__login-form" onSubmit={handleLogin}>
						<div className="input__wrapper">
							<input
								className="header__input"
								type="text"
								placeholder="username"
								name="userName"
							/>
							{loginUserNameErrorMessage && (
								<p className="header__input--error">
									{loginUserNameErrorMessage}
								</p>
							)}
						</div>
						<div className="input__wrapper">
							<input
								className="header__input"
								type="password"
								placeholder="password"
								name="password"
							/>
							{loginPasswordErrorMessage && (
								<p className="header__input--error">
									{loginPasswordErrorMessage}
								</p>
							)}
						</div>
						<button
							type="submit"
							className="btn btn-primary btn-sm ml-2">
							LOGIN
						</button>
					</form>
				)}
			</div>
		</section>
	);
};

export default Header;
