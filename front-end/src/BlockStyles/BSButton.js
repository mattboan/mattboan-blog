import React from "react";

class BSButton extends React.Component {
	onToggle = (e) => {
		console.log("test");
		e.preventDefault();
		this.props.onToggle(this.props.style);
	};

	render() {
		let className = "BSButton";
		if (this.props.active) {
			className += " activeButton";
		}
		return (
			<button className={className} onClick={this.onToggle}>
				{this.props.label}
			</button>
		);
	}
}

export default BSButton;
