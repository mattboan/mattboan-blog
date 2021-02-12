import React from "react";
import { FaLinkedin, FaGithub, FaGit, FaDribbble, FaEnvelope } from "react-icons/fa";
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
						If you want to learn, contribute, or just see what I'm working on in a
						greater detail than a github repository might provide, this is where it all
						happens. This blog is a culmination of all the projects I've been working
						on. Here I delve deep into great detail providing my thoughts and
						methodologies when working on a project, no matter how big or small I always
						ensure that I put my all into what I do.
					</p>
				</div>
				<div className="creds">
					<h2>Credentials</h2>
					<p>
						I love learning, and then applying various skills together to create some
						unique, interesting, and exciting. Below is a list of my professional
						learning credentials however, I never stop learning and always aiming to
						improve myself!
					</p>
					<ul>
						<li>🎨 Certificate III in Graphic Design</li>
						<li>🎨 Certificate IV in Graphic Design</li>
						<li>
							💻 Bachelors Degree - Double Major in Computer Science &amp; Web and
							Mobile Design
						</li>
					</ul>
				</div>
				<div className="socials">
					<h2>Get in touch</h2>
					<p>
						Want to reach out? Great contact me via any social media platform you
						prefer!
					</p>
					<div className="socialsCon">
						<SocialIcon
							url="https://www.linkedin.com/in/matt-boan-656561129/"
							icon={<FaLinkedin className="icon" />}
						/>
						<SocialIcon
							url="https://www.github.com/mattboan"
							icon={<FaGithub className="icon" />}
						/>
						<SocialIcon
							url="mailto:mattboan97@gmail.com"
							icon={<FaEnvelope className="icon" />}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default AboutMe;
