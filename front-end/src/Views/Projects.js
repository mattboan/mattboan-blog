import React from 'react';

import ProjectCon from "../Components/ProjectsCon";
import SearchBar from "../Components/SearchBar";

import './Projects.css';

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return(
            <div className="Projects">
                <h2>Projects</h2>
                <SearchBar placeholder="Search Projects"/>
                <ProjectCon />
            </div>
        );
    }
}

export default Projects;
