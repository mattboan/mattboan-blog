import React from 'react';

import Thumbnail from './Thumbnail';
import BigButton from './BigButton';
import "./ProjecsCon.css";

const ANIM_MULTI = 250;

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
                    this.props.projects.map((project, index) => 
                        <Thumbnail key={project.id} item={project} link='Project' anim={(ANIM_MULTI * index)}/>
                    ) 
                }
                </div>
            </div>
        );
    }
}

export default ProjectsCon;
