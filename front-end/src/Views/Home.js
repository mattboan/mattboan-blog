import React from "react";
import DotLoader from "react-spinners/DotLoader";

import ProjectsCon from "../Components/ProjectsCon";

import "./Home.css";
import dotConfig from "../Config/DotConfig";
import API from '../Config/API';

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
        fetch(API.url + "/Projects")
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
            <div className="Home">
                <h2>Projects</h2>
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
                        return <ProjectsCon projects={projects} />;
                    }
                })()}
                <h2>Blog Posts</h2>
            </div>
        );
    }
}

export default Home;
