import React from "react";

import DotLoader from "react-spinners/DotLoader";
import ProjectCon from "../Components/ProjectsCon";
import SearchBar from "../Components/SearchBar";

import "./Projects.css";
import dotConfig from "../Config/DotConfig";
import API from '../Config/API';
import TagCon from "../Components/TagCon";

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loaded: false,
            projects: [],
        };

        this.search = this.search.bind(this);
    }

    componentDidMount() {
        this.loadProjects();
    }

    search(query) {
        this.setState({ error: null, loaded: false });
        //Can now pass a query from search bar to here, need to make new API request based on query.
        fetch(API.url + "/queryProjects:" + query)
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        loaded: true,
                        projects: result,
                    });
                },
                (error) => {
                    console.log(error);

                    this.setState({
                        loaded: true,
                        error: error,
                    });
                }
            );
    }

    //API call to retrieve projects
    loadProjects() {
        fetch(API.url + "/projects")
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        loaded: true,
                        projects: result,
                    });
                },
                (error) => {
                    this.setState({
                        loaded: true,
                        error: error,
                    });
                }
            );
    }

    render() {
        const { error, loaded, projects } = this.state;

        return (
            <div className="Projects">
                <h2>Projects</h2>
                <div className="searchBarWrapper">
                    <SearchBar
                        placeholder="Search Projects"
                        onSearch={this.search}
                    />
                </div>
                <TagCon />
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
