import React from "react";
import "./TagCon.css";
import Tag from "./Tag";

import API from "../Config/URL";

class TagCon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tags: [],
		};
	}

	componentDidMount() {
		this.loadTags();
	}

	loadTags() {
		fetch(API.backend + "/tags")
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						tags: result,
						isLoaded: true,
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error: error,
					});
				}
			);
	}

	render() {
		console.log("Tag Props: " + JSON.stringify(this.props, null, 2));
		return (
			<div className="TagCon-Con">
				{this.state.tags.map((tag) => (
					<Tag
						id={tag.id}
						text={tag.text}
						onSearch={this.props.onSearch}
					/>
				))}
			</div>
		);
	}
}

export default TagCon;
