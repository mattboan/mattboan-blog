import React from "react";

//Styles
import "./Styles/Tag.css";

class Tag extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id,
		};
	}

	onSearch = () => {
		if (this.props.onSearch) {
			this.props.onSearch(this.state.id);
		}
	};

	render() {
		return (
			<div
				onClick={this.onSearch}
				className="MainCon"
				style={{
					fontSize: this.props.size,
					borderColor: this.props.color,
				}}>
				<p>{this.props.text}</p>
				{(() => {
					if (this.props.mutable) {
						return (
							<button
								onClick={() => {
									this.props.onRemove(this.state.id);
								}}>
								X
							</button>
						);
					}
				})()}
			</div>
		);
	}
}

export default Tag;
