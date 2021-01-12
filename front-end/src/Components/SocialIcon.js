import React from "react";
import "./SocialIcon.css";

class SocialIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="SocialIcon">{this.props.icon}</div>;
  }
}

export default SocialIcon;
