import React from "react";
import axios from "axios";
import Tag from "./Tag";

//Config
import API from "../Config/URL";

//Styles
import "./Styles/EditTags.css";

/**
 * This Component is for display a list of tags and allowing the user to
 * either add tags or remove them that then can be sent to the API to set a
 * Projects tags
 */
class EditTags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tagTextInput: "",
            tagColorInput: "",
            boxColor: "#1f1",
            loaded: true,
            uploaded: false,
            tags: [],
            tempTags: [],
        };
    }

    componentDidMount() {
        this.getTagsFromAPI();
    }

    //Validate color
    isHexColor = (hex) => {
        console.log("checking: " + hex);
        return (
            typeof hex === "string" &&
            hex.length === 6 &&
            !isNaN(Number("0x" + hex))
        );
    };

    //Handle the text input changing
    handleTagTextInput = (event) => {
        this.setState({
            tagTextInput: event.target.value,
        });
    };

    //Handle the color input changing
    handleTagColorInput = (event) => {
        this.setState({
            tagColorInput: event.target.value,
        });

        if (this.isHexColor(event.target.value.substring(1))) {
            console.log("is valid!");
            this.setState({ boxColor: event.target.value });
        }
    };

    onRemove = (id) => {
        console.log("onRemove() called");
        let form = new FormData();
        let self = this;

        form.append("id", id);

        axios({
            method: "post",
            url: API.backend + "/DeleteTag",
            data: form,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (res) {
                self.getTagsFromAPI();
                console.log(res);
            })
            .catch(function (res) {
                console.log(res);
            });
    };

    onAdd = () => {
        this.setState({ uploaded: false });

        //Strip tags of the color attribute
        let test = JSON.parse(JSON.stringify(this.state.tags));
        test.forEach((tag) => {
            delete tag["id"];
            this.state.tempTags.push(tag);
        });

        if (this.state.tagTextInput) {
            console.log("Invalid Text Input");
        }

        //Push the input value into the tags aswell - NOTE doesnt need setState because
        //we dont need a re-render here
        this.state.tempTags.push({
            text: this.state.tagTextInput,
            color: this.state.boxColor,
        });

        //See if tag exists
        this.state.tempTags.forEach((tag) => {
            var form = new FormData();
            form.append("text", tag.text);

            axios({
                method: "post",
                url: API.backend + "/TagExists",
                data: form,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (res) {
                    console.log(
                        "Tag exists: " + JSON.stringify(res.data.tagExists)
                    );

                    if (!res.data.tagExists) {
                        form.delete("text");
                        form.append("tag", JSON.stringify(tag));
                        axios({
                            method: "post",
                            url: API.backend + "/InsertTag",
                            data: form,
                            headers: { "Content-Type": "multipart/form-data" },
                        })
                            .then((res) => {
                                console.log("inserted tags: " + res.data);
                            })
                            .catch((res) => {
                                console.log(res);
                            });
                    }
                })
                .catch(function (res) {
                    console.log(res);
                });
        });
    };

    tagExists = () => {};

    postToAPI = () => {
        console.log("postToAPI() called");
        let form = new FormData();
        let tempTags = this.state.tempTags;
        let self = this;
        this.setState({ tempTags: [] });

        console.log(tempTags);
        form.append("tags", JSON.stringify(tempTags));
        form.append("projectID", this.props.projectID);

        axios({
            method: "post",
            url: API.backend + "/UpdateTags",
            data: form,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (res) {
                console.log("here");
                self.getTagsFromAPI();
                console.log(res);
            })
            .catch(function (res) {
                console.log(res);
            });
    };

    getTagsFromAPI = () => {
        console.log("getTagsFromAPI()");
        fetch(API.backend + "/Tags" + this.props.projectID)
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log("result");
                    this.setState({ tags: result });
                },
                (error) => {
                    console.log("Error /Project: " + error);
                }
            );
    };

    render() {
        return (
            <div className="EditTags">
                <div className="EditTags-TagsCon">
                    {this.state.tags.map((tag, index) => (
                        <Tag
                            id={tag.id}
                            text={tag.text}
                            color={tag.color}
                            onSearch={null}
                            size="14px"
                            mutable={true}
                            key={index}
                            onRemove={this.onRemove}
                        />
                    ))}
                </div>
                <div className="EditTags-input">
                    <label>Tag Name</label>
                    <input
                        type="text"
                        value={this.state.tagTextInput}
                        onChange={this.handleTagTextInput}
                    ></input>
                    <label>Tag Color</label>
                    <div className="EditTags-ColorPicker">
                        <div
                            className="EditTags-ColorPickerColorBlock"
                            style={{
                                backgroundColor: this.state.boxColor,
                            }}
                        />
                        <input
                            type="text"
                            value={this.state.tagColorInput}
                            onChange={this.handleTagColorInput}
                        ></input>
                        <button
                            className="EditTags-Button"
                            onClick={this.onAdd}
                        >
                            Update Tags
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditTags;
