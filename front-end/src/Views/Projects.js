import React from "react";
import axios from "axios";
import DotLoader from "react-spinners/DotLoader";
import ProjectCon from "../Components/ProjectsCon";
import SearchBar from "../Components/SearchBar";
import TagCon from "../Components/TagCon";
import { FaPlus } from "react-icons/fa";

//Config
import dotConfig from "../Config/DotConfig";
import API from "../Config/URL";
import { getToken, isLogin } from "../Config/Auth";

//Styles
import "./Styles/Projects.css";

class Projects extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			loaded: false,
			projects: [],
		};

		this.search = this.search.bind(this);
		this.searchTags = this.searchTags.bind(this);
	}

	componentDidMount() {
		this.loadProjects();
	}

	//Create a new Project - Just request a new project empty contents -> get the returned ID
	//-> route to EditProject with the new ID
	createNewProject() {
		var authHead = null;
		if (isLogin()) {
			authHead = `Bearer ${getToken()}`;
		}

		axios({
			method: "post",
			url: API.backend + "/api/create-project",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: authHead,
			},
		}).then(function (res) {
			console.log(res);
			//This will be where the ID of the newly created project will passed to the EditProject React Route
		});
	}

	search(query) {
		this.setState({ error: null, loaded: false });

		axios
			.get(API.backend + "/api/project-query:" + query)
			.then((res) => {
				this.setState({
					loaded: true,
					projects: res.data.projects,
				});
			})
			.catch((err) => {
				this.setState({
					loaded: true,
					error: err,
				});
			});
	}

	searchTags(query) {
		this.setState({ loaded: false, error: null });
		axios
			.get(API.backend + "/api/project-with-tag:" + query)
			.then((res) => {
				this.setState({
					loaded: true,
					projects: res.data.projects,
				});
			})
			.catch((err) => {
				this.setState({
					loaded: true,
					error: err,
				});
			});
	}

	//API call to retrieve projects
	loadProjects() {
		axios
			.get(API.backend + "/api/projects")
			.then((res) => {
				this.setState({
					loaded: true,
					projects: res.data.projects,
				});
			})
			.catch((err) => {
				this.setState({
					loaded: true,
					error: err,
				});
			});
	}

	render() {
		const { error, loaded, projects } = this.state;

		return (
			<div className="Projects">
				<div className="ProjectsHeader">
					<h2>Projects</h2>
					{isLogin() ? (
						<button className="ProjectsHeaderButton" onClick={this.createNewProject}>
							<FaPlus />
							<span>Project</span>
						</button>
					) : (
						<div />
					)}
				</div>

				<div className="searchBarWrapper">
					<SearchBar placeholder="Search Projects" onSearch={this.search} />
				</div>
				<TagCon onSearch={this.searchTags} />
				{(() => {
					if (error) {
						return <div>Error Loading Projects.</div>;
					} else if (!loaded) {
						return <DotLoader css={dotConfig} size={55} color={"#dd5405"} />;
					} else if (!projects.length) {
						return <p className="noprojectsfound">No Projects Found.</p>;
					} else {
						return <ProjectCon projects={projects} />;
					}
				})()}
			</div>
		);
	}
}

export default Projects;
