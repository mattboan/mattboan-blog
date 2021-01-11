import React from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return(
            <div className="SearchBar">
                <input placeholder={this.props.placeholder}></input>
                <button><FaSearch className="FaSearch"/></button>
            </div>
        );
    }
}

export default SearchBar;
