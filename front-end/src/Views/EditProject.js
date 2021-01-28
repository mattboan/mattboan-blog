import React from "react";
import {
	EditorState,
	RichUtils,
	convertToRaw,
	convertFromRaw,
	AtomicBlockUtils,
} from "draft-js";
import Editor from "draft-js-plugins-editor";
import addLinkPlugin from "../EditorPlugins/EditorLinkPlugin";
import { mediaBlockRenderer } from "../EditorPlugins/MediaBlockRenderer";
import axios from "axios";
import { FaBold, FaItalic, FaUnderline, FaLink, FaImage } from "react-icons/fa";
import BSToolbar, { getBlockStyle } from "../BlockStyles/BSToolbar";
import EditTags from "../Components/EditTags";

//Config
import API from "../Config/URL";

//Styles
import "./Styles/EditProject.css";

class EditProject extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.id,
			image: null,
			previewImage: null,
			error: null,
			isLoaded: false,
			project: { name: "" },
			tags: [],
			editorState: EditorState.createEmpty(this.decorator),
		};

		this.plugins = [addLinkPlugin];
	}

	componentDidMount() {
		this.getProjectFromAPI();
		this.getTagsFromAPI();
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
				previewImage: URL.createObjectURL(img),
			});
		}
	};

	onAddLink = () => {
		const editorState = this.state.editorState;
		const selection = editorState.getSelection();
		const link = window.prompt("Paste the link -");
		if (!link) {
			this.onChange(RichUtils.toggleLink(editorState, selection, null));
			return "handled";
		}
		const content = editorState.getCurrentContent();
		const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
			url: link,
		});
		const newEditorState = EditorState.push(
			editorState,
			contentWithEntity,
			"create-entity"
		);
		const entityKey = contentWithEntity.getLastCreatedEntityKey();
		this.onChange(
			RichUtils.toggleLink(newEditorState, selection, entityKey)
		);
		return "handled";
	};

	onURLChange = (e) => this.setState({ urlValue: e.target.value });

	focus = () => this.refs.editor.focus();

	onAddImage = (e) => {
		e.preventDefault();
		const editorState = this.state.editorState;
		const urlValue = window.prompt("Paste Image Link");
		const contentState = editorState.getCurrentContent();
		const contentStateWithEntity = contentState.createEntity(
			"image",
			"IMMUTABLE",
			{ src: urlValue }
		);
		const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
		const newEditorState = EditorState.set(
			editorState,
			{ currentContent: contentStateWithEntity },
			"create-entity"
		);
		this.setState(
			{
				editorState: AtomicBlockUtils.insertAtomicBlock(
					newEditorState,
					entityKey,
					" "
				),
			},
			() => {
				setTimeout(() => this.focus(), 0);
			}
		);
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
		console.log("blockType: " + blockType);
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
									convertFromRaw(JSON.parse(result[0].post)),
									this.decorator
							  )
							: EditorState.createEmpty(this.decorator);

						this.setState({
							project: result[0],
							previewImage: result[0].image,
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
				<div className="tagsEdit">
					<label>Tags</label>
					<EditTags
						tags={this.state.tags}
						projectID={this.state.project.id}
					/>
				</div>
				<div className="projectPostEdit">
					<label>Post</label>
					<div className="toolbar-con">
						<BSToolbar
							editorState={this.state.editorState}
							onToggle={this.toggleBlockType}
						/>
						<button onClick={this.onUnderlineClick}>
							<FaUnderline />
						</button>
						<button onClick={this.onBoldClick}>
							<FaBold />
						</button>
						<button onClick={this.onItalicClick}>
							<FaItalic />
						</button>
						<button
							id="link_url"
							onClick={this.onAddLink}
							className="add-link">
							<FaLink />
						</button>
						<button onClick={this.onAddImage}>
							<FaImage />
						</button>
					</div>

					<div className="postEditorCon">
						{(() => {
							//This could be removed? could set the init value of the editorState to createEmpty() then overwrite with a new one from the API
							if (this.state.editorState) {
								return (
									<Editor
										blockRendererFn={mediaBlockRenderer}
										editorState={this.state.editorState}
										blockStyleFn={getBlockStyle}
										handleKeyCommand={this.handleKeyCommand}
										onChange={this.onChange}
										plugins={this.plugins}
										ref="editor"
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
