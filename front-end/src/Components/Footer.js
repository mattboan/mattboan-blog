import React from "react";
import {
    FaHome,
    FaDraftingCompass,
    FaAddressCard,
    FaMugHot,
    FaAd,
    FaLinkedin,
    FaGithub,
    FaGit,
} from "react-icons/fa";

import "./Footer.css";
import ContactMe from "./ContactMe";

class Footer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="footerconmain">
                <div className="footercon">
                    <div className="footercon-col">
                        <h3>Quicklinks</h3>
                        <ul>
                            <li>
                                <FaHome /> <p>Home</p>
                            </li>
                            <li>
                                <FaDraftingCompass /> <p>Projects</p>
                            </li>
                            <li>
                                <FaAddressCard /> <p>About Me</p>
                            </li>
                            <li>
                                <FaMugHot /> <p>Misc.</p>
                            </li>
                        </ul>
                    </div>
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
                    <div className="footercon-col">
                        <ContactMe />
                    </div>
                </div>
                <p>&copy; 2021 Matt Boan. All Rights Reserved.</p>
            </div>
        );
    }
}

export default Footer;
