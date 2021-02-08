import React from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { EditorState, convertFromRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import addLinkPlugin from "../EditorPlugins/EditorLinkPlugin";
import { mediaBlockRenderer } from "../EditorPlugins/MediaBlockRenderer";
import axios from "axios";

//Config
import Tag from "../Components/Tag";
import API from "../Config/URL";
import { isLogin } from "../Config/Auth";

//Styles
import "./Styles/Project.css";

class Project extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			project: {},
			tags: [],
			editorState: null,
			scroll: 0,
		};

		this.plugins = [addLinkPlugin];
	}

	componentDidMount() {
		this.getProjectFromAPI();
		this.loadTags();
		window.addEventListener("scroll", this.progressBar);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.progressBar);
	}

	progressBar = () => {
		const scrollTotal = document.documentElement.scrollTop;
		const heightWin =
			document.documentElement.scrollHeight -
			document.documentElement.clientHeight;
		const scroll = `${(scrollTotal / heightWin) * 100}%`;

		this.setState({
			scroll: scroll,
		});
	};

	onChange = (editorState) => {
		this.setState({ editorState });
	};

	loadTags() {
		axios
			.get(API.backend + "/tags" + this.props.match.params.id)
			.then((res) => {
				this.setState({
					tags: res.data,
					isLoaded: true,
				});
			})
			.catch((err) => {
				this.setState({
					isLoaded: true,
					error: err,
				});
			});
	}

	getProjectFromAPI() {
		axios
			.get(API.backend + "/Project" + this.props.match.params.id)
			.then((res) => {
				if (res.data[0].post) {
					console.log("post test: " + res.data[0].post);
					this.setState({
						editorState: EditorState.createWithContent(
							convertFromRaw(JSON.parse(res.data[0].post))
						),
					});
					console.log("test");
				} else {
					this.setState({
						editorState: EditorState.createEmpty(),
					});
				}

				this.setState({
					project: res.data[0],
				});
			})
			.catch((err) => {
				this.setState({
					isLoaded: true,
					error: err,
				});
			});
	}

	render() {
		const progressMainWrapper = {
			background: "rgba(255, 255, 255, 0)",
			height: "5px",
			position: "fixed",
			top: 0,
			left: 0,
			zIndex: 101,
			width: "100%",
		};

		const progressMainStyle = {
			borderRadius: "10px",
			transition: "0.1s ease",
			height: "5px",
			background: "#dd5404",
			width: this.state.scroll,
		};

		return (
			<div className="Project">
				<div className="progress-bar" style={progressMainWrapper}>
					<div style={progressMainStyle} />
				</div>
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
								{isLogin() ? (
									<Link
										to={{
											pathname: `/EditProject/${this.props.match.params.id}`,
										}}
										className="editButton">
										<FaEdit className="icon" />
									</Link>
								) : (
									<div />
								)}
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
												plugins={this.plugins}
												onChange={this.onChange}
												blockRendererFn={
													mediaBlockRenderer
												}
											/>
										);
									}
								})()}
							</div>
						</div>
					</div>
					<div className="sidepanel">
						<Link className="profile" to="/AboutMe">
							<div className="innerCon">
								<img src="../img/me2.jpg" alt="Author" />
								<div className="author">
									<p className="authorName">Matt Boan</p>
									<p className="authorDesc">
										Programmer, Designer, Fullstack 🙏
									</p>
								</div>
							</div>
						</Link>

						{/*
						//This can be implemented later as a nice to have
						<div className="moreFromTheAuthor">
							<div className="innerCon">
								<h3>More From the Author</h3>
								<p>Another one.</p>
							</div>
						</div>
						*/}
					</div>
				</div>
			</div>
		);
	}
}

export default Project;
