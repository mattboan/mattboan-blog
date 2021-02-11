import React from "react";
import axios from "axios";
import Tag from "./Tag";

//Config
import API from "../Config/URL";
import { getToken, isLogin } from "../Config/Auth";

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
			tagTextInput: "",
			tagColorInput: "",
			boxColor: "#1f1",
			loaded: true,
			uploaded: false,
			tags: [],
			tempTags: [],
		};

		this.onAdd = this.onAdd.bind(this);
	}

	componentDidMount() {
		this.getTags();
	}

	//Validate color
	isHexColor = (hex) => {
		console.log("checking: " + hex);
		return typeof hex === "string" && hex.length === 6 && !isNaN(Number("0x" + hex));
	};

	//Handle the text input changing
	handleTagTextInput = (event) => {
		this.setState({
			tagTextInput: event.target.value,
		});
	};

	//Handle the color input changing
	handleTagColorInput = (event) => {
		this.setState({
			tagColorInput: event.target.value,
		});

		if (this.isHexColor(event.target.value.substring(1))) {
			console.log("is valid!");
			this.setState({ boxColor: event.target.value });
		}
	};

	onRemove = (id) => {
		let authHead = null;
		if (isLogin()) {
			authHead = `Bearer ${getToken()}`;
		}

		const params = new URLSearchParams();
		params.append("tag_id", id);
		params.append("project_id", this.props.projectID);

		axios({
			method: "delete",
			url: API.backend + "/api/delete-projects-tags",
			data: params,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: authHead,
			},
		})
			.then((res) => {
				console.log(res);
				//Get the new tags and set the state
				return axios.get(API.backend + "/api/projects-tags:" + this.props.projectID);
			})
			.then((res) => {
				this.setState({ tags: res.data.tags });
			})
			.catch(function (res) {
				console.log(res);
			});
	};

	onAdd(state) {
		//Strip tags of the color attribute
		let test = JSON.parse(JSON.stringify(this.state.tags));
		test.forEach((tag) => {
			delete tag["id"];
			if (tag.text !== "") this.state.tempTags.push(tag);
		});

		//Push the input value into the tags aswell - NOTE doesnt need setState because
		//we dont need a re-render here
		if (this.state.tagTextInput !== "") {
			this.state.tempTags.push({
				text: this.state.tagTextInput,
				color: this.state.boxColor,
			});
		}

		this.state.tempTags.forEach((tag) => {
			this.updateTags(tag);
		});
	}

	//Long list of API calls :)
	async updateTags(tag) {
		var authHead = null;
		if (isLogin()) {
			authHead = `Bearer ${getToken()}`;
		}

		var tag_id = 0;
		const insertTagParams = new URLSearchParams();
		insertTagParams.append("text", tag.text);
		insertTagParams.append("color", tag.color);

		//1. Check if tag exists
		axios({
			method: "get",
			url: API.backend + "/api/tag-exists:" + tag.text,
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		})
			//2. If tag doesn't exists create one, if it does exists move to next api call
			.then((res) => {
				//If the tag exsits then it will return the id of the tag or 0 if it doesn't exists
				if (!res.data.tag_id) {
					return axios({
						method: "post",
						url: API.backend + "/api/create-tag",
						data: insertTagParams,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
							Authorization: authHead,
						},
					});
				} else {
					return res;
				}
			})
			//3. Check if tag exists in the projects tags
			.then((res) => {
				tag_id = res.data.tag_id;
				const projsTagsParams = new URLSearchParams();
				projsTagsParams.append("tag_id", tag_id);
				projsTagsParams.append("project_id", this.props.projectID);

				return axios({
					method: "get",
					url: API.backend + "/api/projects-tags-exists",
					data: projsTagsParams,
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
				});
			})
			//4. If the tag is not linked to the project then insert it into the projects tags table
			.then((res) => {
				console.log("/api/projects-tags-exists");
				if (res.data.id === 0) {
					const params = new URLSearchParams();
					params.append("tag_id", tag_id);
					params.append("project_id", this.props.projectID);

					return axios({
						method: "post",
						url: API.backend + "/api/create-projects-tags",
						data: params,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
							Authorization: authHead,
						},
					});
				} else {
					return res;
				}
			})
			.then((res) => {
				//Get the new tags and set the state
				return axios.get(API.backend + "/api/projects-tags:" + this.props.projectID);
			})
			.then((res) => {
				this.setState({ tags: res.data.tags });
				this.setState({ tempTags: [] });
			});

		this.setState({ tempTags: [] });
	}

	getTags = () => {
		axios.get(API.backend + "/api/projects-tags:" + this.props.projectID).then((res) => {
			this.setState({
				tags: res.data.tags,
				tempTags: [],
			});
		});
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
					<label>Tag Name</label>
					<input
						type="text"
						value={this.state.tagTextInput}
						onChange={this.handleTagTextInput}></input>
					<label>Tag Color</label>
					<div className="EditTags-ColorPicker">
						<div
							className="EditTags-ColorPickerColorBlock"
							style={{
								backgroundColor: this.state.boxColor,
							}}
						/>
						<input
							type="text"
							value={this.state.tagColorInput}
							onChange={this.handleTagColorInput}></input>
						<button className="EditTags-Button" onClick={this.onAdd}>
							Update Tags
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default EditTags;
