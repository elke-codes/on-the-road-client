/// --- AVATAR JSX --- ///

import React from "react";
import "./Avatar.scss";

const Avatar = (props) => {
	const { addedClass } = props;

	let addedAvatarClass = "";
	if (addedClass) {
		addedAvatarClass = " " + addedClass;
	}

	return (
		<div className={"Avatar" + addedAvatarClass}>
			<img
				src={
					"https://static.vecteezy.com/system/resources/thumbnails/003/337/511/small/default-avatar-photo-placeholder-profile-icon-female-vector.jpg"
				}
				alt="representation of self"
				className="Avatar__image"
			/>
		</div>
	);
};

export default Avatar;
