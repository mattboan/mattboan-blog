import React from "react";
import axios from "axios";
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
		console.log("getting tags");
		axios
			.get(API.backend + "/api/tags")
			.then((res) => {
				this.setState({ loaded: true, tags: res.data.tags });
			})
			.catch((err) => {
				this.setState({ loaded: true, error: err });
			});
	}

	render() {
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
