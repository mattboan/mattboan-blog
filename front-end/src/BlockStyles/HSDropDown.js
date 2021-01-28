import React from "react";

import "./Styles/HSDropDown.css";

class HSDropDown extends React.Component {
	onToggle = (event) => {
		let value = event.target.value;
		this.props.onToggle(value);
		console.log("HSDropDown onToggle: " + value);
	};

	render() {
		return (
			<select
				className="HSDropDown"
				value={this.props.active}
				onChange={this.onToggle}>
				<option value="">Header Levels</option>
				{this.props.headerOptions.map((heading, index) => {
					return (
						<option key={index} value={heading.style}>
							{heading.label}
						</option>
					);
				})}
			</select>
		);
	}
}

export default HSDropDown;
