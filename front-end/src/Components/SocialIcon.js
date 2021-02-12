import React from "react";

//Styles
import "./Styles/SocialIcon.css";

class SocialIcon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<a href={this.props.url} className="SocialIcon">
				{this.props.icon}
			</a>
		);
	}
}

export default SocialIcon;
