import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

import "./EditProject.css";

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

    headerImageOnChange = (e) => {
        console.log("Image input: " + JSON.stringify(e.target.files[0]));
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
        console.log(this);
        return (
            <div className="EditProject">
                <h2>Edit Project</h2>
                <div className="headerImageEdit">
                    <h3>Header Image</h3>
                    <img src={this.state.project.image} alt="Header Image" />
                    <div className="headerImageControls">
                        <button onClick={this.triggetHeaderImageInput}>
                            Upload
                        </button>
                        <input
                            ref={(inputRef) => (this.inputRef = inputRef)}
                            onChange={this.headerImageOnChange}
                            type="file"
                            name="headerImageInput"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default EditProject;
