import React from "react";
import Modal from "react-modal";
import { convertToRaw, convertFromRaw } from "draft-js";
import axios from "axios";
import DotLoader from "react-spinners/DotLoader";
import PostEditor from "../Components/PostEditor";
import { getToken, isLogin } from "../Config/Auth";

import EditTags from "../Components/EditTags";

//Config
import API from "../Config/URL";
import dotConfig from "../Config/DotConfig";

//Styles
import "./Styles/EditProject.css";

Modal.setAppElement("#root");

const DES_LEN = 80;

class EditProject extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.id,
			image: null,
			previewImage: null,
			error: null,
			isLoaded: false,
			tagsLoaded: false,
			project: { name: "", description: "" },
			contentState: null,
			tempContentState: null,
			modalIsOpen: false,
		};
	}

	componentDidMount() {
		this.getProject();
	}

	openModal = () => {
		this.setState({ modalIsOpen: true });
	};

	closeModal = () => {
		this.setState({ modalIsOpen: false });
	};

	//Pass this to the PostEditor Comp.
	getContentState = (tempContentState) => {
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

	projectDescChange = (event) => {
		this.setState({
			project: {
				...this.state.project,
				description: event.target.value,
			},
		});
	};

	triggetHeaderImageInput = (e) => {
		this.inputRef.click(e);
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
	updateProject = () => {
		if (
			!window.confirm(
				"Did you remember to touch the post section, if not it will be deleted!"
			)
		)
			return;
		let authHead = null;
		if (isLogin()) {
			authHead = `Bearer ${getToken()}`;
		}
		let form = new FormData();
		let project = this.state.project;

		//Trim down the decsription
		if (project.description) project.description = project.description.slice(0, DES_LEN);

		//Append converted content state to the form item project
		let tempContentState = convertToRaw(this.state.contentState);
		project.post = tempContentState;

		form.append("project", JSON.stringify(project));
		form.append("header-image", this.state.image);
		axios({
			method: "post",
			url: API.backend + "/api/update-project",
			data: form,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: authHead,
			},
		})
			.then(function (res) {
				alert(JSON.stringify(res.data));
				console.log(res);
			})
			.catch(function (res) {
				console.log(res);
			});
	};

	getProject = () => {
		axios
			.get(API.backend + "/api/project:" + this.props.match.params.id)
			.then((res) => {
				if (res.data.project[0]) {
					let tempContentState = null;
					if (res.data.project[0].post) {
						tempContentState = convertFromRaw(JSON.parse(res.data.project[0].post));
					}

					this.setState({
						project: res.data.project[0],
						previewImage: res.data.project[0].image,
						contentState: tempContentState,
						isLoaded: true,
					});
				}
			})
			.catch((err) => {
				console.log("Error /Project: " + err);
			});
	};

	//This needs authentication.
	deleteProject = () => {
		let authHead = null;
		if (isLogin()) {
			authHead = `Bearer ${getToken()}`;
		}
		axios({
			method: "delete",
			url: API.backend + "/api/remove-project:" + this.props.match.params.id,
			headers: {
				Authorization: authHead,
			},
		})
			.then(function (res) {
				alert(JSON.stringify(res.data));
				console.log(res);
			})
			.catch(function (res) {
				console.log(res);
			});
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
							backgroundImage: "url('" + this.state.previewImage + "')",
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
				<div className="projectDescEdit">
					<label>Short Description</label>
					<input
						type="text"
						placeholder="Enter a short description for the project"
						value={this.state.project.description}
						onChange={this.projectDescChange}
					/>
				</div>
				<div className="tagsEdit">
					<label>Tags</label>
					<EditTags projectID={this.props.match.params.id} />
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
					<button onClick={this.updateProject}>Update Post</button>
					<button style={{ backgroundColor: "grey" }} onClick={this.getProject}>
						Clear Changes
					</button>
					<button style={{ backgroundColor: "red" }} onClick={this.openModal}>
						Delete Post
					</button>
				</div>

				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					contentLabel="Example Modal">
					<p>Are you sure you want to delete this Project?</p>
					<button onClick={this.closeModal}>Close</button>
					<button
						style={{ backgroundColor: "red", color: "white" }}
						onClick={this.deleteProject}>
						Delete
					</button>
				</Modal>
			</div>
		);
	}
}

export default EditProject;
