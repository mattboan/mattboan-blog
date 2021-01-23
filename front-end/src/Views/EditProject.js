import React from "react";
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    convertFromRaw,
} from "draft-js";
import axios from "axios";

import "./EditProject.css";
import API from "../Config/API";

class EditProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            image: null,
            error: null,
            isLoaded: false,
            project: {},
            editorState: null,
        };
    }

    componentDidMount() {
        this.getProjectFromAPI();
    }

    testFunction = () => {
        console.log("testFunction: " + JSON.stringify(this.state.project));
    };

    projectTitleHandler = (event) => {
        this.setState({
            project: {
                ...this.state.project,
                name: event.target.value,
            },
        });
        //        this.setState({ inputTitle: event.target.value });
        console.log("Project name: " + this.state.project.name);
    };

    onChange = (editorState) => {
        this.setState({ editorState });
    };

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(
            this.state.editorState,
            command
        );

        if (newState) {
            this.onChange(newState);
            return "handled";
        }

        return "not-handled";
    };

    triggetHeaderImageInput = (e) => {
        this.inputRef.click();
    };

    headerImageOnChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                image: img
            });
        }
    };

    /**
     * Send form: (image, project title, project post, tags) to API
     * @param {*} image
     */
    postToAPI = () => {
        console.log("postToAPI() called!");
        let form = new FormData();
        let project = this.state.project;
        let contentState = convertToRaw(this.state.editorState.getCurrentContent());

        project.post = JSON.stringify(contentState);

        console.log((project));

        form.append("project", project);
        form.append("headerImage", this.state.image);
        axios({
            method: "post",
            url: API.url + "/test",
            data: form,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (res) {
                console.log(res);
            })
            .catch(function (res) {
                console.log(res);
            });
    };

    getProjectFromAPI = () => {
        console.log("id: " + this.state.id);
        fetch("http://localhost:8080/Project" + this.state.id)
            .then((res) => res.json())
            .then((result) => {
                //console.log("Project: " + JSON.parse(result));

                //Get the raw post
                if (result[0].post) {
                    console.log("post test: " + result[0].post);
                    this.setState({/*
                        editorState: EditorState.createWithContent(
                            convertFromRaw(JSON.parse(result[0].post))
                        ),*/
                    });
                    console.log("test");
                } else {
                    this.setState({
                        editorState: EditorState.createEmpty(),
                    });
                }

                this.setState({
                    project: result[0],
                    isLoaded: true,
                    error: "There was an error",
                });
            });
    };

    render() {
        return (
            <div className="EditProject">
                <h2>Edit Project</h2>
                <div className="headerImageEdit">
                    <h3>Header Image</h3>
                    <div
                        className="imageHeader"
                        style={{
                            backgroundImage:
                                "url('" + this.state.project.image + "')",
                        }}
                    ></div>
                    <div className="headerImageControls">
                        <button onClick={this.triggetHeaderImageInput}>
                            Upload
                        </button>
                        <input
                            ref={(inputRef) => (this.inputRef = inputRef)}
                            onChange={this.headerImageOnChange}
                            type="file"
                            name="headerImage"
                        />
                    </div>
                </div>
                <div className="projectTitleEdit">
                    <label for="projectTitle">Project Title</label>
                    <input
                        name="projectTitle"
                        type="text"
                        placeholder="Project Title"
                        value={this.state.project.name}
                        onChange={this.projectTitleHandler}
                    ></input>
                </div>
                <div className="projectPostEdit">
                    <label for="projectPost">Post</label>
                    <div className="postEditorCon">
                        {(() => {
                            if (this.state.editorState) {
                                return (
                                    <Editor
                                        editorState={this.state.editorState}
                                        handleKeyCommand={this.handleKeyCommand}
                                        onChange={this.onChange}
                                    />
                                );
                            }
                        })()}
                    </div>
                </div>

                <div className="bottomControls">
                    <button onClick={this.postToAPI}>Update Post</button>
                    <button
                        style={{ backgroundColor: "grey" }}
                        onClick={this.getProjectFromAPI}
                    >
                        Clear Changes
                    </button>
                    <button style={{ backgroundColor: "red" }}>
                        Delete Post
                    </button>
                </div>
            </div>
        );
    }
}

export default EditProject;
