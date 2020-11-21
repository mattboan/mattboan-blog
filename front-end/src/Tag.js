import React from 'react';
import './Tag.css';

class Tag extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="MainCon" style={{
                fontSize: this.props.size,
                borderColor: this.props.color
            }}>
                <p>{this.props.text}</p>
            </div>
        );
    }
}

export default Tag;