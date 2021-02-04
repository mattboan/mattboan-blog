import React from "react";
import axios from "axios";
import Tag from "./Tag";

//Config
import API from "../Config/URL";

//Styles
import "./Styles/EditTags.css";

/**
 * This Component is for display a list of tags and allowing the user to
 * either add tags or remove them that then can be sent to the API to set a
 * Projects tags
 */
class EditTags extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: "",
			loaded: true,
			uploaded: false,
			tags: [],
			tempTags: [],
		};
	}

	componentDidMount() {
		this.getTagsFromAPI();
	}

	//Handle the input changing
	handleInput = (event) => {
		this.setState({
			input: event.target.value,
		});
	};

	onRemove = (id) => {
		/* console.log(
            "Remove " + id + " from the parent id of: " + this.props.projectID
        ); */
	};

	onAdd = () => {
		this.setState({ uploaded: false });

		//Strip tags of the color attribute
		let test = JSON.parse(JSON.stringify(this.state.tags));
		test.forEach((tag) => {
			delete tag["color"];
			delete tag["id"];
			this.state.tempTags.push(tag.text);
		});

		//Push the input value into the tags aswell - NOTE doesnt need setState because
		//we dont need a re-render here
		this.state.tempTags.push(this.state.input);

		this.postToAPI();
	};

	postToAPI = () => {
		console.log("postToAPI() called");
		let form = new FormData();
		let tempTags = this.state.tempTags;
		this.setState({ tempTags: [] });

		console.log(tempTags);
		form.append("tags", JSON.stringify(tempTags));
		form.append("projectID", this.props.projectID);

		axios({
			method: "post",
			url: API.backend + "/UpdateTags",
			data: form,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (res) {
				this.getTagsFromAPI();
				console.log(res);
			})
			.catch(function (res) {
				console.log(res);
			});
	};

	getTagsFromAPI = () => {
		console.log("Got projectID: " + this.props.projectID);
		fetch(API.backend + "/Tags" + this.props.projectID)
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({ tags: result, loaded: true });
				},
				(error) => {
					console.log("Error /Project: " + error);
				}
			);
	};

	render() {
		return (
			<div className="EditTags">
				<div className="EditTags-TagsCon">
					{this.state.tags.map((tag, index) => (
						<Tag
							id={tag.id}
							text={tag.text}
							color={tag.color}
							onSearch={null}
							size="14px"
							mutable={true}
							key={index}
							onRemove={this.onRemove}
						/>
					))}
				</div>
				<div className="EditTags-input">
					<input
						type="text"
						value={this.state.input}
						onChange={this.handleInput}></input>
					<button onClick={this.onAdd}>Add</button>
				</div>
			</div>
		);
	}
}

export default EditTags;
