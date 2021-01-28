import React from "react";

//Styles
import "./Styles/BigButton.css";

const def_primary_color = "#dd5405";
const def_accent_color = "#FFFFFF";

class BigButton extends React.Component {
	constructor() {
		super();
		this.state = {
			primary_color: def_primary_color,
			accent_color: def_accent_color,
			shadow: false,
		};
	}

	render() {
		if (this.props.primary_color != null) {
			this.state.primary_color = this.props.primary_color;
		}

		if (this.props.accent_color != null) {
			this.state.accent_color = this.props.accent_color;
		}

		if (this.props.shadow != null) {
			this.state.shadow = this.props.shadow;
		}

		return (
			<div className="BigButton">
				<a
					className={this.state.shadow ? "" : "addShadow"}
					href={this.props.onClick}
					style={{
						backgroundColor: this.state.primary_color,
						color: this.state.accent_color,
					}}>
					{this.props.text}
				</a>
			</div>
		);
	}
}

export default BigButton;
