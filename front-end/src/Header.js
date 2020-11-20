import React from 'react';
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
                Menu
                </div>
            </header>
        );
    }
}

export default Header;