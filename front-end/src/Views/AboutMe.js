import React from "react";
import {
	FaLinkedin,
	FaGithub,
	FaGit,
	FaDribbble,
	FaEnvelope,
} from "react-icons/fa";
import SocialIcon from "../Components/SocialIcon";

//Styles
import "./Styles/AboutMe.css";

const headerImage = "./img/beach-2.png";

class AboutMe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="AboutMe">
				<div
					className="aboutMeImageHeader"
					style={{
						backgroundImage: "url('" + headerImage + "')",
					}}></div>
				<div className="para">
					<h2>This Site</h2>
					<p>
						If you want to learn, contribute, or just see what I'm
						working on in a greater detail than a github repository
						might provide, this is where it all happens. This blog
						is a culmination of all the projects I've been working
						on. Here I delve deep into great detail providing my
						thoughts and methodologies when working on a project, no
						matter how big or small I always ensure that I put my
						all into what I do.
					</p>
				</div>
				<div className="creds">
					<h2>Credentials</h2>
					<ul>
						<li>Certificate III in Graphic Design</li>
						<li>Certificate IV in Graphic Design</li>
						<li>
							Bachelors Degree - Double Major in Computer Science
							&amp; Web and Mobile Design
						</li>
					</ul>
				</div>
				<div className="socials">
					<h2>Get in touch</h2>
					<p>
						Want to reach out? Great contact me via any social media
						platform you prefer!
					</p>
					<div className="socialsCon">
						<SocialIcon icon={<FaLinkedin className="icon" />} />
						<SocialIcon icon={<FaGithub className="icon" />} />
						<SocialIcon icon={<FaEnvelope className="icon" />} />
					</div>
				</div>
			</div>
		);
	}
}

export default AboutMe;
