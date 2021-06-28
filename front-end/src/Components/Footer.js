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
import { Link } from "react-router-dom";
import ContactMe from "./ContactMe";

//Styles
import "./Styles/Footer.css";

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
						<Link to="/Home">
							<FaHome /> <p>Home</p>
						</Link>
						<Link to="/Projects">
							<FaDraftingCompass /> <p>Projects</p>
						</Link>
						<Link to="/AboutMe">
							<FaAddressCard /> <p>About Me</p>
						</Link>
					</div>
					<div className="footercon-col">
						<h3>Socials</h3>
						<a href="https://www.linkedin.com/in/matthew-boan-656561129/">
							<FaLinkedin />
							<p>LinkedIn</p>
						</a>
						<a href="https://www.github.com/mattboan">
							<FaGithub />
							<p>Github</p>
						</a>
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
