import React from 'react';

import './AboutMe.css';

class AboutMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return(
            <div className="AboutMe">
                <h2>About Me</h2>
                <img src='./img/beach.jpg' />
                <p>About me page... </p>
            </div>
        );
    }
}

export default AboutMe;
