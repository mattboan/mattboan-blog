import React from 'react';
import { Link } from "react-router-dom";

import './ProjectThumb.css';
import Tag from './Tag';

class ProjectThumb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            tags: [],
            isHovered: false,
        }
    }

    componentDidMount() {
        this.loadTags();
    }

    loadTags() {
        fetch('http://localhost:8080/tags' + this.props.id)
        .then(res => res.json())
        .then(
            (result) => {
                console.log("Tags: " + JSON.stringify(result));
                this.setState({
                    tags: result,
                    isLoaded: true,
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: error
                });
            }
        );
    }

    render() {
        console.log('ProjectThumb: ' + this.props.id);
        return(
            <Link to= {{ pathname: `/Project/${this.props.id}` }} className="ProjectCon">

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
                    {this.state.tags.map((tag) => 
                    <Tag text={tag.text} color={tag.color} size="12px"></Tag>)}
                </div>                
            </Link>
            
        );
    }
}

export default ProjectThumb;