import React from "react";
import "./TagCon.css";
import Tag from "./Tag";

//Placeholder tags
const TAGS = [
  "Raspberry Pi",
  "React",
  "Node JS",
  "React Native",
  "Arduino",
  "C",
  "C++",
  "Java",
];

class TagCon extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="TagCon-Con">
        {TAGS.map((text) => (
          <Tag tag={text} />
        ))}
      </div>
    );
  }
}

export default TagCon;
