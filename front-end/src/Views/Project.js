import React from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import "./Project.css";

import Tag from "../Components/Tag";

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            project: {},
            tags: [],
        };
    }

    componentDidMount() {
        this.getProjectFromAPI();
        this.loadTags();
    }

    loadTags() {
        fetch("http://localhost:8080/tags" + this.props.match.params.id)
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        tags: result,
                        isLoaded: true,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error,
                    });
                }
            );
    }

    getProjectFromAPI() {
        fetch("http://localhost:8080/Project" + this.props.match.params.id)
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        project: result[0],
                    });
                },
                (error) => {
                    console.log("API call failed");
                    this.setState({
                        isLoaded: true,
                        error: error,
                    });
                }
            );
    }

    render() {
        return (
            <div className="Project">
                <div className="flexCon">
                    <div className="contentCon">
                        <div
                            className="imageHeader"
                            alt="Header"
                            style={{
                                backgroundImage:
                                    "url('" + this.state.project.image + "')",
                            }}
                        ></div>
                        <div className="projectcon">
                            <div className="headerCon">
                                <h2>{this.state.project.name}</h2>
                                <Link
                                    to={{
                                        pathname: `/EditProject/${this.props.match.params.id}`,
                                    }}
                                    className="editButton"
                                >
                                    <FaEdit className="icon" />
                                </Link>
                            </div>
                            <div className="ThumbnailTags">
                                {this.state.tags.map((tag) => (
                                    <Tag
                                        key={tag.id}
                                        text={tag.text}
                                        color={tag.color}
                                        size="12px"
                                    />
                                ))}
                            </div>
                            <p>{this.state.project.description}</p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Molestie at elementum eu facilisis sed odio.
                                Facilisi nullam vehicula ipsum a arcu cursus
                                vitae congue mauris. Cursus euismod quis viverra
                                nibh cras. Ac turpis egestas maecenas pharetra
                                convallis posuere. Parturient montes nascetur
                                ridiculus mus mauris vitae. Magna ac placerat
                                vestibulum lectus mauris ultrices eros in
                                cursus. Mi ipsum faucibus vitae aliquet nec
                                ullamcorper sit amet. Aliquam sem fringilla ut
                                morbi tincidunt. Volutpat est velit egestas dui
                                id ornare arcu odio ut. Mi bibendum neque
                                egestas congue quisque. Feugiat sed lectus
                                vestibulum mattis. Id aliquet lectus proin nibh.
                                Nisi est sit amet facilisis magna etiam tempor
                                orci eu. Imperdiet sed euismod nisi porta lorem.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Molestie at elementum eu facilisis sed odio.
                                Facilisi nullam vehicula ipsum a arcu cursus
                                vitae congue mauris. Cursus euismod quis viverra
                                nibh cras. Ac turpis egestas maecenas pharetra
                                convallis posuere. Parturient montes nascetur
                                ridiculus mus mauris vitae. Magna ac placerat
                                vestibulum lectus mauris ultrices eros in
                                cursus. Mi ipsum faucibus vitae aliquet nec
                                ullamcorper sit amet. Aliquam sem fringilla ut
                                morbi tincidunt. Volutpat est velit egestas dui
                                id ornare arcu odio ut. Mi bibendum neque
                                egestas congue quisque. Feugiat sed lectus
                                vestibulum mattis. Id aliquet lectus proin nibh.
                                Nisi est sit amet facilisis magna etiam tempor
                                orci eu. Imperdiet sed euismod nisi porta lorem.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Molestie at elementum eu facilisis sed odio.
                                Facilisi nullam vehicula ipsum a arcu cursus
                                vitae congue mauris. Cursus euismod quis viverra
                                nibh cras. Ac turpis egestas maecenas pharetra
                                convallis posuere. Parturient montes nascetur
                                ridiculus mus mauris vitae. Magna ac placerat
                                vestibulum lectus mauris ultrices eros in
                                cursus. Mi ipsum faucibus vitae aliquet nec
                                ullamcorper sit amet. Aliquam sem fringilla ut
                                morbi tincidunt. Volutpat est velit egestas dui
                                id ornare arcu odio ut. Mi bibendum neque
                                egestas congue quisque. Feugiat sed lectus
                                vestibulum mattis. Id aliquet lectus proin nibh.
                                Nisi est sit amet facilisis magna etiam tempor
                                orci eu. Imperdiet sed euismod nisi porta lorem.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Molestie at elementum eu facilisis sed odio.
                                Facilisi nullam vehicula ipsum a arcu cursus
                                vitae congue mauris. Cursus euismod quis viverra
                                nibh cras. Ac turpis egestas maecenas pharetra
                                convallis posuere. Parturient montes nascetur
                                ridiculus mus mauris vitae. Magna ac placerat
                                vestibulum lectus mauris ultrices eros in
                                cursus. Mi ipsum faucibus vitae aliquet nec
                                ullamcorper sit amet. Aliquam sem fringilla ut
                                morbi tincidunt. Volutpat est velit egestas dui
                                id ornare arcu odio ut. Mi bibendum neque
                                egestas congue quisque. Feugiat sed lectus
                                vestibulum mattis. Id aliquet lectus proin nibh.
                                Nisi est sit amet facilisis magna etiam tempor
                                orci eu. Imperdiet sed euismod nisi porta lorem.
                            </p>
                        </div>
                    </div>
                    <div className="sidepanel">
                        <div className="profile">
                            <div className="innerCon">
                                <img src="../img/me2.jpg" alt="Author" />
                                <div className="author">
                                    <p className="authorName">Matt Boan</p>
                                    <p className="authorDesc">
                                        Programmer, Designer, Fullstack 🙏
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="moreFromTheAuthor">
                            <div className="innerCon">
                                <h3>More From the Author</h3>
                                <p>Another one.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Project;
