import React from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
        };
    }

    inputHandler = (event) => {
        this.setState({query: event.target.value});
    }

    render() {
        return(
            <div className="SearchBar">
                <input placeholder={this.props.placeholder} onChange={this.inputHandler}></input>
                <button onClick={ () => {this.props.onSearch(this.state.query)}}><FaSearch className="FaSearch"/></button>
            </div>
        );
    }
}

export default SearchBar;
