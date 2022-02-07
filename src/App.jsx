/// --- APP.JSX --- ///

import "./App.scss";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import MapPage from "./pages/MapPage/MapPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import { useState, useEffect } from "react";
import { getLoggedInUserFromStorage } from "./utils/users/getLoggedInUserFromStorage";
import { getFriendsData } from "./utils/users/getFriendsData";
import AboutPage from "./pages/AboutPage/AboutPage";

const App = () => {
	const [loggedInUser, setLoggedInUser] = useState();
	const [friendsData, setFriendsData] = useState([]);
	const [selectedFriend, setSelectedFriend] = useState(null);
	const [room, setRoom] = useState();

	useEffect(() => {
		console.log("env", process.env);
		const user = getLoggedInUserFromStorage();
		setLoggedInUser(user);
	}, []);

	useEffect(async () => {
		if (!loggedInUser) {
			return;
		}
		console.log("gettting friends data");
		const friends = await getFriendsData(loggedInUser);
		setFriendsData(friends);
	}, [loggedInUser]);

	return (
		<BrowserRouter>
			<Header
				loggedInUser={loggedInUser}
				setLoggedInUser={setLoggedInUser}
				setFriendsData={setFriendsData}
			/>

			<Switch>
				<Route path="/" exact>
					<HomePage
						loggedInUser={loggedInUser}
						setLoggedInUser={setLoggedInUser}
					/>
				</Route>
				<Route path="/map">
					<MapPage
						loggedInUser={loggedInUser}
						setLoggedInUser={setLoggedInUser}
						friendsData={friendsData}
						setSelectedFriend={setSelectedFriend}
						setRoom={setRoom}
					/>
				</Route>

				<Route path="/chat">
					<ChatPage
						loggedInUser={loggedInUser}
						friendsData={friendsData}
						selectedFriend={selectedFriend}
						setSelectedFriend={setSelectedFriend}
						setRoom={setRoom}
						room={room}
					/>
				</Route>

				<Route path="/about">
					<AboutPage />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
