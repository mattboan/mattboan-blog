import React from 'react';
import './HeaderTag.css';

class HeaderTag extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="MainCon" style={{fontSize: this.props.size}}>
                <p>{this.props.tag}</p>
            </div>
        );
    }
}

export default HeaderTag;