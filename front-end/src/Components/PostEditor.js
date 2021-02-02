import React from "react";
import { EditorState, RichUtils, AtomicBlockUtils } from "draft-js";
import { FaBold, FaItalic, FaUnderline, FaLink, FaImage } from "react-icons/fa";
import BSToolbar, { getBlockStyle } from "../BlockStyles/BSToolbar";
import { mediaBlockRenderer } from "../EditorPlugins/MediaBlockRenderer";
import addLinkPlugin from "../EditorPlugins/EditorLinkPlugin";
import Editor from "draft-js-plugins-editor";

class PostEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
        };

        this.plugins = [addLinkPlugin];
    }

    componentDidMount() {
        if (this.props.contentState) {
            this.setState({
                editorState: EditorState.createWithContent(
                    this.props.contentState
                ),
            });
        }
    }

    onChange = (editorState) => {
        this.setState({ editorState });
        this.props.onChange(editorState.getCurrentContent());
    };

    onURLChange = (e) => this.setState({ urlValue: e.target.value });

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

    onUnderlineClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
        );
    };

    onBoldClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "BOLD")
        );
    };

    onItalicClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
        );
    };

    toggleBlockType = (blockType) => {
        console.log("blockType: " + blockType);
        this.onChange(
            RichUtils.toggleBlockType(this.state.editorState, blockType)
        );
    };

    onAddLink = () => {
        const editorState = this.state.editorState;
        const selection = editorState.getSelection();
        const link = window.prompt("Paste the link -");
        if (!link) {
            this.onChange(RichUtils.toggleLink(editorState, selection, null));
            return "handled";
        }
        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
            url: link,
        });
        const newEditorState = EditorState.push(
            editorState,
            contentWithEntity,
            "create-entity"
        );
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        this.onChange(
            RichUtils.toggleLink(newEditorState, selection, entityKey)
        );
        return "handled";
    };

    onAddImage = (e) => {
        e.preventDefault();
        const editorState = this.state.editorState;
        const urlValue = window.prompt("Paste Image Link");
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            "image",
            "IMMUTABLE",
            { src: urlValue }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity },
            "create-entity"
        );
        this.setState({
            editorState: AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                " "
            ),
        });
    };

    render() {
        return (
            <div className="projectPostEdit">
                <label>Post</label>
                <div className="toolbar-con">
                    <BSToolbar
                        editorState={this.state.editorState}
                        onToggle={this.toggleBlockType}
                    />
                    <button onClick={this.onUnderlineClick}>
                        <FaUnderline />
                    </button>
                    <button onClick={this.onBoldClick}>
                        <FaBold />
                    </button>
                    <button onClick={this.onItalicClick}>
                        <FaItalic />
                    </button>
                    <button
                        id="link_url"
                        onClick={this.onAddLink}
                        className="add-link"
                    >
                        <FaLink />
                    </button>
                    <button onClick={this.onAddImage}>
                        <FaImage />
                    </button>
                </div>

                <div className="postEditorCon">
                    {(() => {
                        //This could be removed? could set the init value of the editorState to createEmpty() then overwrite with a new one from the API
                        if (this.state.editorState) {
                            return (
                                <Editor
                                    blockRendererFn={mediaBlockRenderer}
                                    editorState={this.state.editorState}
                                    blockStyleFn={getBlockStyle}
                                    handleKeyCommand={this.handleKeyCommand}
                                    onChange={this.onChange}
                                    plugins={this.plugins}
                                />
                            );
                        }
                    })()}
                </div>
            </div>
        );
    }
}

export default PostEditor;
