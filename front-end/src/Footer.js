import React from 'react';
import { FaLinkedin, FaGithub, FaGit } from 'react-icons/fa';
import './Footer.css';

class Footer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="footerconmain">
                <div className="footercon">
                    <div className="footercon-col">
                        <h3>Socials</h3>
                        <ul>
                            <li>
                                <FaLinkedin />
                                <p>LinkedIn</p>
                            </li>
                            <li>
                                <FaGithub />
                                <p>Github</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <p>&copy; 2020 Matt Boan. All Rights Reserved.</p>
            </div>
            
        );
    }
}

export default Footer;
