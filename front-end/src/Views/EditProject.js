import React from "react";
import {
	Editor,
	EditorState,
	RichUtils,
	convertToRaw,
	convertFromRaw,
} from "draft-js";
import axios from "axios";

import "./EditProject.css";
import API from "../Config/URL";
import BSToolbar, { getBlockStyle } from "../BlockStyles/BSToolbar";

class EditProject extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			image: null,
			error: null,
			isLoaded: false,
			project: { name: "" },
			editorState: EditorState.createEmpty(),
		};
	}

	componentDidMount() {
		this.getProjectFromAPI();
	}

	testFunction = () => {
		console.log("testFunction: " + JSON.stringify(this.state.project));
	};

	projectTitleHandler = (event) => {
		this.setState({
			project: {
				...this.state.project,
				name: event.target.value,
			},
		});
		//        this.setState({ inputTitle: event.target.value });
		console.log("Project name: " + this.state.project.name);
	};

	onChange = (editorState) => {
		this.setState({ editorState });
	};

	handleKeyCommand = (command) => {
		const newState = RichUtils.handleKeyCommand(
			this.state.editorState,
			command
		);

		if (newState) {
			this.onChange(newState);
			return "handled";
		}

		return "not-handled";
	};

	triggetHeaderImageInput = (e) => {
		this.inputRef.click();
	};

	headerImageOnChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			let img = event.target.files[0];
			this.setState({
				image: img,
			});
		}
	};

	onUnderlineClick = () => {
		this.onChange(
			RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
		);
	};

	onBoldClick = () => {
		this.onChange(
			RichUtils.toggleInlineStyle(this.state.editorState, "BOLD")
		);
	};

	onItalicClick = () => {
		this.onChange(
			RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
		);
	};

	toggleBlockType = (blockType) => {
		this.onChange(
			RichUtils.toggleBlockType(this.state.editorState, blockType)
		);
	};

	/**
	 * Send form: (image, project title, project post, tags) to API
	 * @param {*} image
	 */
	postToAPI = () => {
		console.log("postToAPI() called");
		let form = new FormData();
		let project = this.state.project;

		let contentState = convertToRaw(
			this.state.editorState.getCurrentContent()
		);

		project.post = contentState;

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
						console.log(
							"result: " + JSON.stringify(result[0], null, 2)
						);
						let tempEditorState = result[0].post
							? EditorState.createWithContent(
									convertFromRaw(JSON.parse(result[0].post))
							  )
							: EditorState.createEmpty();

						this.setState({
							project: result[0],
							editorState: tempEditorState,
							isLoaded: true,
						});
					}
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
								"url('" + this.state.project.image + "')",
						}}></div>
					<div className="headerImageControls">
						<button onClick={this.triggetHeaderImageInput}>
							Upload
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
				<div className="projectPostEdit">
					<label>Post</label>
					<div className="toolbar-con">
						<BSToolbar
							editorState={this.state.editorState}
							onToggle={this.toggleBlockType}
						/>
						<button onClick={this.onUnderlineClick}>U</button>
						<button onClick={this.onBoldClick}>
							<b>B</b>
						</button>
						<button onClick={this.onItalicClick}>
							<em>I</em>
						</button>
					</div>

					<div className="postEditorCon">
						{(() => {
							if (this.state.editorState) {
								return (
									<Editor
										editorState={this.state.editorState}
										blockStyleFn={getBlockStyle}
										handleKeyCommand={this.handleKeyCommand}
										onChange={this.onChange}
									/>
								);
							}
						})()}
					</div>
				</div>

				<div className="bottomControls">
					<button onClick={this.postToAPI}>Update Post</button>
					<button
						style={{ backgroundColor: "grey" }}
						onClick={this.getProjectFromAPI}>
						Clear Changes
					</button>
					<button style={{ backgroundColor: "red" }}>
						Delete Post
					</button>
				</div>
			</div>
		);
	}
}

export default EditProject;
