import React from 'react';
import Thumbnail from './Thumbnail';

import BigButton from './BigButton';
import "./ProjecsCon.css";

class ProjectsCon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="ProjecConCon">
                <div className="projects">
                {
                    this.props.projects.map((project) => <Thumbnail key={project.id} item={project} link='Project'/> ) 
                }
                </div>
                
                <div className="loadmore">
                    <BigButton text="Load More" shadow="false"></BigButton>
                </div>
            </div>
        );
    }
}

export default ProjectsCon;
