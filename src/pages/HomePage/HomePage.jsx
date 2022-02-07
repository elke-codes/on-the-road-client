import "./HomePage.scss";

import React, { useState } from "react";
import Register from "../../components/Register/Register";
import { Link } from "react-router-dom";
import axios from "axios";
import { getUserData } from "../../utils/users/getUserData";

const HomePage = ({ loggedInUser, setLoggedInUser }) => {
	const [register, setRegister] = useState(false);
	const [login, setLogin] = useState(false);

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
				return user;
			})
			.then((user) => setLoggedInUser(user))
			.catch((e) => {
				if (
					e.response.data.message.toLowerCase().includes("password")
				) {
					setLoginPasswordErrorMessage(e.response.data.message);
				} else if (
					e.response.data.message.toLowerCase().includes("username")
				) {
					setLoginUserNameErrorMessage(e.response.data.message);
				}
				console.log("error message", e.response.data.message);
			});

		setLoggedInUser(true);
	};

	return (
		<main className="homepage">
			{!register && !loggedInUser && !login && (
				<>
					<div className="homepage__buttons">
						<h1 className="homepage__title">
							the social network that moves with you
						</h1>
						<button
							className="btn btn-success"
							onClick={() => setRegister(true)}>
							GET STARTED!
						</button>
					</div>
				</>
			)}

			{!loggedInUser && register && (
				<Register
					setLoggedInUser={setLoggedInUser}
					className="homepage__register"
				/>
			)}

			{!loggedInUser && login && (
				<form className="header__login-form" onSubmit={handleLogin}>
					<div className="input__wrapper">
						<input
							className="header__input"
							type="text"
							placeholder="enter your username"
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
							placeholder="enter your password"
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
						className="header__button-login"
						onSubmit={handleLogin}>
						LOGIN
					</button>
				</form>
			)}

			{loggedInUser && (
				<>
					<Link to="/map" className="homepage__get-started">
						Explore where your connections are
					</Link>
					<Link to="/chat" className="homepage__get-started">
						Chat with your friends
					</Link>
				</>
			)}
		</main>
	);
};

export default HomePage;
