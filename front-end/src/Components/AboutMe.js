import React from 'react';
import './AboutMe.css';

class BigButton extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="AboutMe">
                <h2>About Me</h2>
                <div className="aboutmecon">
                    <div className="maincon">
                        <div className="mainconimg">
			                <div className="imgring">
                                <img src="./me2.jpg" />
                            </div>
                        </div>
                        <div className="maincontext">
                            <h3>Matt Boan</h3>
                            <h4>Full Stack Software Developer </h4>
                        </div>
                    </div>
                    <div className="socials">
                        <p>
                            Hey, I'm Matt Boan currently studying Computer Science and Web and Mobile Design
                            at Murdoch University. This website showcases all of my most recent and interesting 
                            projects I've been working on.
                        </p>
                        <a href="github.com/mattboan">
                            Github: github.com/mattboan/
                        </a>
                        <br></br>
                        <a href="linkedin.com/mattboan">
                            Linkedin: linkedin.com/mattboan
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default BigButton;
