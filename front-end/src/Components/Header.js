import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaDraftingCompass, FaAddressCard, FaMugHot } from "react-icons/fa";
import Hamburger from "hamburger-react";

//Styles
import "./Styles/Header.css";

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menuOpen: false,
		};
		this.onMenuClick = this.onMenuClick.bind(this);
	}

	onMenuClick() {
		const menuState = this.state.menuOpen;
		this.setState({ menuOpen: !menuState });
	}

	render() {
		return (
			<div>
				<header className="App-header">
					<Link className="App-header-text" to="/">
						matt boan
					</Link>
					<Hamburger
						rounded
						className="menubtn"
						toggled={this.state.menuOpen}
						toggle={this.onMenuClick}
						size={26}
						hideOutline={true}
					/>
				</header>
				<div className={this.state.menuOpen ? "dropDown slideDown" : "dropDown slideUp"}>
					<Link to="/Home" onClick={this.onMenuClick}>
						<FaHome /> <p>Home</p>
					</Link>
					<Link to="/Projects" onClick={this.onMenuClick}>
						<FaDraftingCompass /> <p>Projects</p>
					</Link>
					<Link to="/AboutMe" onClick={this.onMenuClick}>
						<FaAddressCard /> <p>About Me</p>
					</Link>
				</div>
			</div>
		);
	}
}

export default Header;
