import React from 'react';
import './Project.css';
import HeaderTag from './HeaderTag';

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
                    {this.props.tags.map((text) => 
                    <HeaderTag tag={text} size="12px"></HeaderTag>)}
                </div>
                
            </div>
        );
    }
}

export default Project;