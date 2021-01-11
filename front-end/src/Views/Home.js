import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ProjectsCon from '../Components/ProjectsCon';

import './Home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            projects: []
        };
    }

    componentDidMount() {
        this.loadProjects();
    }

    loadProjects() {
        fetch('http://localhost:8080/projects')
        .then(res => res.json())
        .then(
            (result) => {
                console.log("Result: " + JSON.stringify(result));
                this.setState({
                    isLoaded: true,
                    projects: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: error
                });
            }
        );
    }

    render() {
        return(
            <div className="Home">
                <h2>Projects</h2>
                <ProjectsCon title="Highlighted Projects" />
                <h2>Blog Posts</h2>
            </div>
        );
    }
}

export default Home;
