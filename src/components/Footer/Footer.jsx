/// --- FOOTER.jsx --- ///

import React from "react";
import "./Footer.scss";

const Footer = () => {
	return (
		<footer className="footer">
			<p className="footer__copy">
				{" "}
				<a
					href="mailto:elke.codes@gmail.com"
					target="_blank"
					rel="noopener noreferrer"
					title="Send me cloud mail"
					className="footer__link-email">
					Elke Dick &#169; 2022{" "}
				</a>
			</p>
		</footer>
	);
};

export default Footer;
