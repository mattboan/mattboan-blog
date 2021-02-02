import React from "react";

import URL from "../Config/URL";

import "./Styles/Banner.css";

class Banner extends React.Component {
	render() {
		return (
			<div className="Banner">
				<div className="BannerText">
					<h3>Create.</h3>
					<h3>Innovate.</h3>
					<h3 className="BannerTextLastLine">Learn.</h3>
				</div>
				<div className="BannerImage">
					<img
						src={URL.backend + "/images/placeholder.svg"}
						alt="Banner"
					/>
				</div>
			</div>
		);
	}
}

export default Banner;
