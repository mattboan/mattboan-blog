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
		console.log("createNewProject()");

		//When authentication is added (set the auth token here before making the request)
		let form = new FormData();
		form.append("username", "mattboan");

		axios({
			method: "post",
			url: API.backend + "/CreateNewProject",
			data: form,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (res) {
				//This will be where the ID of the newly created project will passed to the EditProject React Route
				console.log(res);
			})
			.catch(function (res) {
				console.log(res);
			});
	}

	search(query) {
		this.setState({ error: null, loaded: false });

		axios
			.get(API.backend + "/queryProjects:" + query)
			.then((res) => {
				this.setState({
					loaded: true,
					projects: res.data,
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
			.get(API.backend + "/queryTags:" + query)
			.then((res) => {
				this.setState({
					loaded: true,
					projects: res.data,
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
			.get(API.backend + "/projects")
			.then((res) => {
				this.setState({
					loaded: true,
					projects: res.data,
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
					<button
						className="ProjectsHeaderButton"
						onClick={this.createNewProject}>
						<FaPlus />
						<span>Project</span>
					</button>
				</div>

				<div className="searchBarWrapper">
					<SearchBar
						placeholder="Search Projects"
						onSearch={this.search}
					/>
				</div>
				<TagCon onSearch={this.searchTags} />
				{(() => {
					if (error) {
						return <div>Error Loading Projects.</div>;
					} else if (!loaded) {
						return (
							<DotLoader
								css={dotConfig}
								size={55}
								color={"#dd5405"}
							/>
						);
					} else {
						return <ProjectCon projects={projects} />;
					}
				})()}
			</div>
		);
	}
}

export default Projects;
