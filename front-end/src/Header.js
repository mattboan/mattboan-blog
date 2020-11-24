import React from 'react';
import { FaHome, FaDraftingCompass, FaAddressCard, FaMugHot, FaAd } from 'react-icons/fa';
import Hamburger from 'hamburger-react';
import './Header.css';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
        };
        this.onMenuClick = this.onMenuClick.bind(this);
    }

    onMenuClick() {
        console.log(this.state.menuOpen);
        const menuState = this.state.menuOpen;
        this.setState({ menuOpen: !menuState })
    }

    render() {
        return(
            <div>
                <header className="App-header" >
                    <a 
                        className="App-header-text" 
                        href="./">
                            Matt Boan
                    </a>
                    <Hamburger onToggle={this.onMenuClick} size={26} />
                </header>
                <div className={this.state.menuOpen ? 'dropDown slideDown': 'dropDown slideUp'}>
                    <ul>
                        <li><a>
                            <FaHome /> <p>Home</p>
                        </a></li>
                        <li><a>
                            <FaDraftingCompass /> <p>Projects</p>
                        </a></li>
                        <li><a>
                            <FaAddressCard /> <p>About Me</p>
                        </a></li>
                        <li><a>
                            <FaMugHot /> <p>Misc.</p>
                        </a></li>
                    </ul>
                </div>
            </div>
            
        );
    }
}

export default Header;