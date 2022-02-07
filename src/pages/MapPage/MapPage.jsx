/// --- MAPPAGE.JSX --- ///

import "./MapPage.scss";
import React, { useState } from "react";
import Map from "../../components/Map/Map";
import Footer from "../../components/Footer/Footer";
import Register from "../../components/Register/Register";

const MapPage = ({
	loggedInUser,
	friendsData,
	setLoggedInUser,
	setSelectedFriend
}) => {
	const [showModal, setShowModal] = useState(false);

	const [register, setRegister] = useState(false);

	return (
		<>
			<main className="map-page">
				{!loggedInUser && !register && (
					<>
						<div className="map-page__not-logged-in">
							<h2 className="map-page__copy">
								Please log in to continue...
							</h2>
							<div className="homepage__buttons">
								<div>
									<button
										className="btn btn-success btn-sm mr-4"
										onClick={() => setRegister(true)}>
										Register
									</button>
									<button className="btn btn-primary btn-sm">
										Login
									</button>
								</div>
							</div>
						</div>
					</>
				)}

				{!loggedInUser && register && (
					<main className="log-in">
						{" "}
						<Register
							setLoggedInUser={setLoggedInUser}
							className="homepage__register"
						/>
					</main>
				)}

				{loggedInUser && !showModal && (
					<>
						<article className="map-page__container">
							<button
								className="map-page__open-modal-button"
								onClick={() => {
									setShowModal(true);
								}}>
								?
							</button>
							<Map
								loggedInUser={loggedInUser}
								friendsData={friendsData}
								setSelectedFriend={setSelectedFriend}
							/>
						</article>
					</>
				)}
				{/* TODO display modal on hover over questionmark  */}
				{loggedInUser && showModal && (
					<>
						<article className="map-page__explanation">
							<h3 className="map-page__modal-title">
								How to use this map{" "}
								<button
									className="map-page__close-modal"
									onClick={() => {
										setShowModal(false);
									}}>
									X
								</button>
							</h3>
							<ul>
								<li>
									drag and zoom around the map to see where
									your connections are
								</li>
								<li>
									the darker the shadow below the marker, the
									more connections are there, zoom in and
									check it out!
								</li>
								<li>click on a marker to see more info</li>
								<li>
									click anywhere on the map to go back to your
									location
								</li>
							</ul>
						</article>
						<article className="map-page__container">
							<Map
								loggedInUser={loggedInUser}
								friendsData={friendsData}
								setSelectedFriend={setSelectedFriend}
								className="map-page__map"
							/>
						</article>
					</>
				)}
			</main>
			<Footer />
		</>
	);
};

export default MapPage;
