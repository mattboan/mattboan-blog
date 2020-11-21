import React from 'react';
import { FaBars } from 'react-icons/fa';
import './Header.css';

class Header extends React.Component {

    render() {
        return(
            <header className="App-header">
                <a 
                className="App-header-text" 
                href="./">
                    Matt Boan
                </a>
                <div className="menu">
                    <FaBars size="20pt"/>
                </div>
            </header>
        );
    }
}

export default Header;