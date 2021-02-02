import React from "react";
import BSButton from "./BSButton";
import HSDropDown from "./HSDropDown";
import { FaQuoteLeft, FaListOl, FaListUl, FaCode } from "react-icons/fa";

//Styles
import "./Styles/BSToolbar.css";

export const BLOCK_TYPES = [
    { label: <FaQuoteLeft />, style: "blockquote" },
    { label: <FaListUl />, style: "unordered-list-item" },
    { label: <FaListOl />, style: "ordered-list-item" },
    { label: <FaCode />, style: "code-block" },
];

export const HEADER_TYPES = [
    { label: "(None)", style: "unstyled" },
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" },
];

export function getBlockStyle(block) {
    switch (block.getType()) {
        case "blockquote":
            return "RichEditor-blockquote";
        default:
            return null;
    }
}

class BSToolbar extends React.Component {
    render() {
        const { editorState } = this.props;
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

        const inlineType = editorState.getCurrentInlineStyle();

        return (
            <span className="RichEditor-controls">
                <HSDropDown
                    headerOptions={HEADER_TYPES}
                    active={blockType}
                    onToggle={this.props.onToggle}
                />

                {BLOCK_TYPES.map((type, index) => {
                    return (
                        <BSButton
                            active={type.style === blockType}
                            label={type.label}
                            onToggle={this.props.onToggle}
                            style={type.style}
                            key={index}
                            type={type}
                        />
                    );
                })}
            </span>
        );
    }
}

export default BSToolbar;
