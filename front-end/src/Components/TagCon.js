import React from "react";
import Tag from "./Tag";

//Config
import API from "../Config/URL";

//Styles
import "./Styles/TagCon.css";

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
				{this.state.tags.map((tag, index) => (
					<Tag
						id={tag.id}
						text={tag.text}
						onSearch={this.props.onSearch}
						color={tag.color}
						size="14px"
						key={index}
					/>
				))}
			</div>
		);
	}
}

export default TagCon;
