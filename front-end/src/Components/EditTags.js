import React from "react";
import Tag from "./Tag";

//Styles

/**
 * This Component is for display a list of tags and allowing the user to
 * either add tags or remove them that then can be sent to the API to set a
 * Projects tags
 */
class EditTags extends React.Component {
	constructor(props) {
		super(props);
		console.log("EditTags: " + JSON.stringify(props.tags));
	}

	onRemove = (id) => {
		console.log(
			"Remove " + id + " from the parent id of: " + this.props.projectID
		);
	};

	render() {
		return (
			<div className="EditTags">
				<div className="EditTags-TagsCon">
					{this.props.tags.map((tag) => (
						<Tag
							id={tag.id}
							text={tag.text}
							color={tag.color}
							onSearch={null}
							size="14px"
							mutable={true}
							onRemove={this.onRemove}
						/>
					))}
				</div>
				<div className="EditTags-input">
					<input type="text" />
					<button>Add</button>
				</div>
			</div>
		);
	}
}

export default EditTags;
