import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import axios from "axios";

import "./EditProject.css";
import API from "../Config/API";

class EditProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            project: {},
            editorState: EditorState.createEmpty(),
        };

        console.log("EditProject id: " + this.props.match.params.id);
    }

    componentDidMount() {
        this.getProjectFromAPI();
    }

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
                project: {
                    image: URL.createObjectURL(img),
                },
            });
            this.postToAPI(img);
        }
    };

    /**
     * Send form: (image, project title, project post, tags) to API
     * @param {*} image
     */
    postToAPI = (image, fields) => {
        let form = new FormData();
        form.append("name", "Matt");
        form.append("headerImage", image);
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

    getProjectFromAPI() {
        fetch("http://localhost:8080/Project" + this.props.match.params.id)
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log("Project: " + JSON.stringify(result));
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
                    <input type="text" placeholder="Project Title"></input>
                </div>
                <div className="projectPostEdit">
                    <label for="projectPost">Post</label>
                    <div className="postEditorCon">
                        <Editor
                            editorState={this.state.editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                        />
                    </div>
                </div>

                <div className="bottomControls">
                    <button>Update Post</button>
                    <button style={{ backgroundColor: "grey" }}>
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
