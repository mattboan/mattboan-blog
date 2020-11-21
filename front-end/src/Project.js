import React from 'react';
import './Project.css';
import Tag from './Tag';

class Project extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="ProjectCon">
                <div className="ProjectConTop">
                    <div className="ProjectConImage"
                        style={{
                            backgroundImage: "url('" + this.props.img + "')"
                        }}
                    >
                    </div>
                    <div className="ProjectConText">
                        <h3>{this.props.name}</h3>
                        <p>{this.props.desc}</p>
                    </div>
                </div>
                <div className="ProjectConBot">
                    {this.props.tags.map((tag) => 
                    <Tag text={tag.text} color={tag.color} size="12px"></Tag>)}
                </div>
                
            </div>
        );
    }
}

export default Project;