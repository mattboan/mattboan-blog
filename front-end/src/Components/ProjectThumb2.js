import React from 'react';
import { Link } from "react-router-dom";

import './ProjectThumb2.css'

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
        fetch('http://localhost:8080/tags' + this.props.project.id)
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
        console.log("ProjectThumb: " + this.props.project.image);
        return(
            <Link to= {{ pathname: `/Project/${this.props.project.id}` }} className="ProjectThumb">
                
                <div className="projectThumbImage"
                style={{ backgroundImage: "url('" + this.props.project.image + "')" }} />
                
                <div className="projectThumbText">
                    <h3>{this.props.project.name}</h3>
                    <p>{this.props.project.description}</p>
                </div>
                
                <div className="projectThumbTags">
                    { this.state.tags.map((tag) => <Tag text={tag.text} color={tag.color} size="12px" />) }
                </div>


            </Link>
        );
    }

}

export default ProjectThumb;