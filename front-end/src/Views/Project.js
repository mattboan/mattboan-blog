import React from 'react';
import './Project.css';

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            project: {},
        };
        console.log("Project: " + this.props.match.params.id)
    }

    componentDidMount() {
        this.getProjectFromAPI();
    }

    getProjectFromAPI() {
        fetch('http://localhost:8080/Project' + this.props.match.params.id)
        .then(res => res.json())
        .then(
            (result) => {
                console.log("Project: " + JSON.stringify(result));
                this.setState({
                    project: result[0]
                });
            },
            (error) => {
                console.log("API call failed");
                this.setState({
                    isLoaded: true,
                    error: error
                });
            }
        );
    }

    render() {
        return(
            <div className="Project">
                <div className="imageHeader"
                    style={{
                        backgroundImage: "url('" + this.state.project.image + "')"
                    }}
                >
                </div>
                <div className="projectcon">
                    <h2>{this.state.project.name}</h2>
                    <p>{this.state.project.description}</p>
                </div>
            </div>
        );
    }
}

export default Project;