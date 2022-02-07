/// --- MAP.JSX --- ///
import "./Map.scss";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
	TileLayer,
	Popup,
	MapContainer,
	Marker,
	useMapEvents,
	useMap,
	useMapEvent,
	Rectangle
} from "react-leaflet";
import { useEventHandlers } from "@react-leaflet/core";
import { v4 as uuid } from "uuid";
import FriendCard from "../FriendCard/FriendCard";

const Map = ({ loggedInUser, friendsData, setSelectedFriend }) => {
	const [userPosition, setUserPosition] = useState(null);
	console.log("friendsdata map", friendsData);
	//on click asks for location and then brings your marker there so smoothly
	const LocationMarker = () => {
		//Save position when user signs up --> TODO add this to their location data

		const map = useMapEvents({
			click() {
				map.locate();
			},
			locationfound(e) {
				setUserPosition(e.latlng);
				map.flyTo(e.latlng, map.getZoom());
			}
		});

		return userPosition === null ? null : (
			<Marker position={userPosition}>
				<Popup>You</Popup>
			</Marker>
		);
	};

	///--- https://react-leaflet.js.org/docs/example-react-control/ --///
	// Classes used by Leaflet to position controls
	const POSITION_CLASSES = {
		bottomleft: "leaflet-bottom leaflet-left",
		bottomright: "leaflet-bottom leaflet-right",
		topleft: "leaflet-top leaflet-left",
		topright: "leaflet-top leaflet-right"
	};

	const BOUNDS_STYLE = { weight: 1 };

	function MinimapBounds({ parentMap, zoom }) {
		const minimap = useMap();

		// Clicking a point on the minimap sets the parent's map center
		const onClick = useCallback(
			(e) => {
				parentMap.setView(e.latlng, parentMap.getZoom());
			},
			[parentMap]
		);
		useMapEvent("click", onClick);

		// Keep track of bounds in state to trigger renders
		const [bounds, setBounds] = useState(parentMap.getBounds());
		const onChange = useCallback(() => {
			setBounds(parentMap.getBounds());
			// Update the minimap's view to match the parent map's center and zoom
			minimap.setView(parentMap.getCenter(), zoom);
		}, [minimap, parentMap, zoom]);

		// Listen to events on the parent map
		const handlers = useMemo(
			() => ({ move: onChange, zoom: onChange }),
			[]
		);
		useEventHandlers({ instance: parentMap }, handlers);

		return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
	}

	function MinimapControl({ position, zoom }) {
		const parentMap = useMap();
		const mapZoom = zoom || 0;

		// Memoize the minimap so it's not affected by position changes
		const minimap = useMemo(
			() => (
				<MapContainer
					style={{ height: 150, width: 200 }}
					center={parentMap.getCenter()}
					zoom={mapZoom}
					dragging={false}
					doubleClickZoom={false}
					scrollWheelZoom={false}
					attributionControl={false}
					zoomControl={false}>
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					<MinimapBounds parentMap={parentMap} zoom={mapZoom} />
				</MapContainer>
			),
			[]
		);

		const positionClass =
			(position && POSITION_CLASSES[position]) ||
			POSITION_CLASSES.topright;
		return (
			<div className={positionClass}>
				<div className="leaflet-control leaflet-bar">{minimap}</div>
			</div>
		);
	}

	return (
		<section className="map">
			<MapContainer
				center={[51.505, -0.09]}
				zoom={3}
				scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{friendsData &&
					friendsData.map((friend) => {
						return (
							<Marker
								position={[
									friend.locations[0].lat,
									friend.locations[0].lng
								]}
								key={uuid()}
								loggedInUser={loggedInUser}
								// TODO HOVER
								// onClick={() => {
								// 	setActiveFriend(friend);
								// }}
								// onMouseOver={(e) => {
								// 	//stackoverflow.com/questions/51662140/how-to-toggle-popup-in-react-leaflet-on-mouse-hover
								// 	// Leaflet Marker object is accessible via event.target property of mouseover and mouseout events, so popup could be opened/closed like this:
								// 	e.target.openPopup();
								// }}
								// onMouseOut={(e) => {
								// 	e.target.closePopup();
								// }}
							>
								<Popup>
									<FriendCard
										friend={friend}
										loggedInUser={loggedInUser}
										setSelectedFriend={setSelectedFriend}
									/>{" "}
								</Popup>
							</Marker>
						);
					})}

				<LocationMarker />
				<MinimapControl position="topright" />
			</MapContainer>
		</section>
	);
};

export default Map;

//It's simple: create L.Map with scrollWheelZoom: false option, then add a listener:

// map.once('focus', function() { map.scrollWheelZoom.enable(); });
