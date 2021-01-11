import React from 'react';
import { Link } from "react-router-dom";

import './Thumbnail.css'

import Tag from './Tag';

class Thumbnail extends React.Component {
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
        fetch('http://localhost:8080/tags' + this.props.item.id)
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
        console.log("Thumbnail: " + this.props.item.image);
        return(
            <Link to= {{ pathname: `${this.props.link}/${this.props.item.id}` }} className="Thumbnail">
                
                <div className="ThumbnailImage"
                style={{ backgroundImage: "url('" + this.props.item.image + "')" }} />
                
                <div className="ThumbnailText">
                    <h3>{this.props.item.name}</h3>
                    <p>{this.props.item.description}</p>
                </div>
                
                <div className="ThumbnailTags">
                    { this.state.tags.map((tag) => <Tag text={tag.text} color={tag.color} size="12px" />) }
                </div>
            </Link>
        );
    }

}

export default Thumbnail;