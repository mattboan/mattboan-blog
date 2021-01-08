import React from 'react';
import './Tag.css';
/*
function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}
*/
class Tag extends React.Component {
    constructor(props) {
        super(props);
        //this.onHover = this.onHover.bind(this);
    }
/*
    onHover(e) {
        console.log("test");
        e.target.style.background = this.props.color;
        e.target.style.color = invertColor(this.props.color);
    }
*/
    render() {
        return(
            <div 
                className="MainCon" 
                style={{
                    fontSize: this.props.size,
                    borderColor: this.props.color
                }}
            >
                <p>{this.props.text}</p>
            </div>
        );
    }
}

export default Tag;