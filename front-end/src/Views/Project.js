import React from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Editor, EditorState, convertFromRaw } from "draft-js";

import "./Project.css";

import Tag from "../Components/Tag";
import API from "../Config/URL";

class Project extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			project: {},
			tags: [],
			editorState: null,
		};
	}

	componentDidMount() {
		this.getProjectFromAPI();
		this.loadTags();
	}

	loadTags() {
		fetch(API.backend + "/tags" + this.props.match.params.id)
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

	getProjectFromAPI() {
		fetch(API.backend + "/Project" + this.props.match.params.id)
			.then((res) => res.json())
			.then(
				(result) => {
					console.log(result[0]);
					//Get the raw post
					if (result[0].post) {
						console.log("post test: " + result[0].post);
						this.setState({
							editorState: EditorState.createWithContent(
								convertFromRaw(JSON.parse(result[0].post))
							),
						});
						console.log("test");
					} else {
						this.setState({
							editorState: EditorState.createEmpty(),
						});
					}

					this.setState({
						project: result[0],
					});
				},
				(error) => {
					console.log("API call failed");
					this.setState({
						isLoaded: true,
						error: error,
					});
				}
			);
	}

	render() {
		return (
			<div className="Project">
				<div className="flexCon">
					<div className="contentCon">
						<div
							className="imageHeader"
							alt="Header"
							style={{
								backgroundImage:
									"url('" + this.state.project.image + "')",
							}}></div>
						<div className="projectcon">
							<div className="headerCon">
								<h2>{this.state.project.name}</h2>
								<Link
									to={{
										pathname: `/EditProject/${this.props.match.params.id}`,
									}}
									className="editButton">
									<FaEdit className="icon" />
								</Link>
							</div>
							<div className="ThumbnailTags">
								{this.state.tags.map((tag) => (
									<Tag
										key={tag.id}
										text={tag.text}
										color={tag.color}
										size="12px"
									/>
								))}
							</div>
							<div className="postcon">
								{(() => {
									if (this.state.editorState) {
										return (
											<Editor
												editorState={
													this.state.editorState
												}
												readOnly={true}
											/>
										);
									}
								})()}
							</div>
						</div>
					</div>
					<div className="sidepanel">
						<div className="profile">
							<div className="innerCon">
								<img src="../img/me2.jpg" alt="Author" />
								<div className="author">
									<p className="authorName">Matt Boan</p>
									<p className="authorDesc">
										Programmer, Designer, Fullstack 🙏
									</p>
								</div>
							</div>
						</div>
						<div className="moreFromTheAuthor">
							<div className="innerCon">
								<h3>More From the Author</h3>
								<p>Another one.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Project;
