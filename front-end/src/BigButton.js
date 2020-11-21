import React from 'react';
import "./BigButton.css";

class BigButton extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="BigButton">
                <a href={this.props.onClick}>
                    {this.props.text}
                </a>
            </div>
            
        );
    }
}

export default BigButton;