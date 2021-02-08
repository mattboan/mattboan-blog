import React from "react";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import ProjectsCon from "../Components/ProjectsCon";
import Banner from "../Components/Banner";

//Config
import dotConfig from "../Config/DotConfig";
import API from "../Config/URL";

//Styles
import "./Styles/Home.css";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			loaded: false,
			projects: [],
		};
	}

	componentDidMount() {
		this.loadProjects();
	}

	//API call to retrieve highlighted projects
	loadProjects() {
		axios
			.get(API.backend + "/Projects")
			.then((res) => {
				console.log(res);
				this.setState({ loaded: true, projects: res.data });
			})
			.catch((err) => {
				this.setState({ loaded: true, error: err });
			});
	}
	render() {
		const { error, loaded, projects } = this.state;
		return (
			<div className="Home">
				<Banner />
				<h2>Projects</h2>
				{(() => {
					if (error) return <div>Error Loading Projects....</div>;
					else if (!loaded)
						return (
							<DotLoader
								css={dotConfig}
								size={55}
								color={"#dd5405"}
							/>
						);
					else return <ProjectsCon projects={projects} />;
				})()}
			</div>
		);
	}
}

export default Home;
