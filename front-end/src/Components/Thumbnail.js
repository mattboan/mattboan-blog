import React from "react";
import { Link } from "react-router-dom";
import Tag from "./Tag";

//Config
import API from "../Config/URL";

//Styles
import "./Styles/Thumbnail.css";

class Thumbnail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			tags: [],
			isHovered: false,
			hidden: true,
		};
	}

	componentDidMount() {
		this.loadTags();

		setTimeout(() => {
			this.show();
		}, this.props.anim);
	}

	show() {
		this.setState({ hidden: false });
	}

	loadTags() {
		fetch(API.backend + "/api/projects-tags:" + this.props.item.id)
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						tags: result.tags,
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
		const classes = this.state.hidden ? "Thumbnail hide" : "Thumbnail";

		return (
			<Link to={{ pathname: `${this.props.link}/${this.props.item.id}` }} className={classes}>
				<div
					className="ThumbnailImage"
					style={{
						backgroundImage: "url('" + this.props.item.image + "')",
					}}
				/>

				<div className="ThumbnailText">
					<h3>{this.props.item.name}</h3>
					<p>{this.props.item.description}</p>
				</div>

				<div className="ThumbnailTags">
					{this.state.tags.map((tag) => (
						<Tag key={tag.id} text={tag.text} color={tag.color} size="12px" />
					))}
				</div>
			</Link>
		);
	}
}

export default Thumbnail;
