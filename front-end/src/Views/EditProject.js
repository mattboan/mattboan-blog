import React from "react";
import Modal from "react-modal";
import { convertToRaw, convertFromRaw } from "draft-js";
import axios from "axios";
import DotLoader from "react-spinners/DotLoader";
import PostEditor from "../Components/PostEditor";

import EditTags from "../Components/EditTags";

//Config
import API from "../Config/URL";
import dotConfig from "../Config/DotConfig";

//Styles
import "./Styles/EditProject.css";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

Modal.setAppElement("#root");

class EditProject extends React.Component {
	constructor(props) {
		super(props);

		var subtitle;

		this.state = {
			id: this.props.match.params.id,
			image: null,
			previewImage: null,
			error: null,
			isLoaded: false,
			project: { name: "" },
			tags: [],
			contentState: null,
			modalIsOpen: false,
		};
	}

	componentDidMount() {
		this.getProjectFromAPI();
		this.getTagsFromAPI();
	}

	openModal = () => {
		this.setState({ modalIsOpen: true });
	};

	closeModal = () => {
		this.setState({ modalIsOpen: false });
	};

	//Pass this to the PostEditor Comp.
	getContentState = (tempContentState) => {
		console.log("Got Content State: " + tempContentState);
		if (tempContentState) {
			this.setState({ contentState: tempContentState });
		}
	};

	projectTitleHandler = (event) => {
		this.setState({
			project: {
				...this.state.project,
				name: event.target.value,
			},
		});
	};

	triggetHeaderImageInput = (e) => {
		this.inputRef.click();
	};

	headerImageOnChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			let img = event.target.files[0];
			this.setState({
				image: img,
				previewImage: URL.createObjectURL(img),
			});
		}
	};

	/**
	 * Send form: (image, project title, project post, tags) to API
	 * @param {*} image
	 */
	postToAPI = () => {
		console.log("postToAPI() called");
		let form = new FormData();
		let project = this.state.project;

		//Append converted content state to the form item project
		let tempContentState = convertToRaw(this.state.contentState);
		project.post = tempContentState;

		form.append("project", JSON.stringify(project));
		form.append("headerImage", this.state.image);
		axios({
			method: "post",
			url: API.backend + "/test",
			data: form,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (res) {
				console.log(res);
			})
			.catch(function (res) {
				console.log(res);
			});
	};

	getProjectFromAPI = () => {
		fetch(API.backend + "/Project" + this.props.match.params.id)
			.then((res) => res.json())
			.then(
				(result) => {
					if (result[0]) {
						let tempContentState = null;
						if (result[0].post) {
							tempContentState = convertFromRaw(
								JSON.parse(result[0].post)
							);
						}

						this.setState({
							project: result[0],
							previewImage: result[0].image,
							contentState: tempContentState,
							isLoaded: true,
						});
					}
				},
				(error) => {
					console.log("Error /Project: " + error);
				}
			);
	};

	getTagsFromAPI = () => {
		fetch(API.backend + "/Tags" + this.props.match.params.id)
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({ tags: result });
				},
				(error) => {
					console.log("Error /Project: " + error);
				}
			);
	};

	render() {
		return (
			<div className="EditProject">
				<h2>Edit Project</h2>
				<div className="headerImageEdit">
					<h3>Header Image</h3>
					<div
						className="imageHeader"
						style={{
							backgroundImage:
								"url('" + this.state.previewImage + "')",
						}}></div>
					<div className="headerImageControls">
						<button onClick={this.triggetHeaderImageInput}>
							Upload New Header Image
						</button>
						<input
							ref={(inputRef) => (this.inputRef = inputRef)}
							onChange={this.headerImageOnChange}
							type="file"
							name="headerImage"
						/>
					</div>
				</div>
				<div className="projectTitleEdit">
					<label>Project Title</label>
					<input
						name="projectTitle"
						type="text"
						placeholder="Project Title"
						value={this.state.project.name}
						onChange={this.projectTitleHandler}></input>
				</div>
				<div className="tagsEdit">
					<label>Tags</label>
					<EditTags
						tags={this.state.tags}
						projectID={this.state.project.id}
					/>
				</div>

				{this.state.isLoaded ? (
					<PostEditor
						contentState={this.state.contentState}
						onChange={this.getContentState}
					/>
				) : (
					<DotLoader css={dotConfig} size={55} color={"#dd5405"} />
				)}

				<div className="bottomControls">
					<button onClick={this.postToAPI}>Update Post</button>
					<button
						style={{ backgroundColor: "grey" }}
						onClick={this.getProjectFromAPI}>
						Clear Changes
					</button>
					<button
						style={{ backgroundColor: "red" }}
						onClick={this.openModal}>
						Delete Post
					</button>
				</div>

				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Example Modal">
					<button onClick={this.closeModal}>close</button>
					<div>I am a modal</div>
					<form>
						<input />
						<button>tab navigation</button>
						<button>stays</button>
						<button>inside</button>
						<button>the modal</button>
					</form>
				</Modal>
			</div>
		);
	}
}

export default EditProject;
