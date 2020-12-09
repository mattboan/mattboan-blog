import React from 'react';
import Project from './Project';
import BigButton from './BigButton';
import DotLoader from 'react-spinners/DotLoader';
import "./Project.css";

const override = `
    display: block;
    margin: 0 auto;
    margin-top: 25px;
    border-color: red;
`;

class ProjectsCon extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            projs: []
        }
    }

    componentDidMount() {
        this.loadProjects();
    }

    loadProjects() {
        fetch('http://192.168.0.239:8080/projects')
        .then(res => res.json())
        .then(
            (result) => {
                console.log("Result: " + JSON.stringify(result));
                this.setState({
                    isLoaded: true,
                    projs: result
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

    loadMoreProjects() {
        fetch('http://192.168.0.239:8080/moreProjects')
        .then(res => res.json())
        .then(
            (result) => {

            },
            (error) => {

            }
        );
    }

    render() {
        const { error, isLoaded, projs } = this.state;
        
        //Depending on the state of the fetch request
        if (error) {
            return (
                <div className="ProjecCon">
                    <h2>Projects</h2>
                    <p>Error retrieving recent projects. 😕</p>
                </div>
            );
        } else if (!isLoaded) {
            return (
                <div className="ProjecCon">
                    <h2>Projects</h2>
                    <DotLoader  
                        css={override}
                        size={30}
                        color={"#dd5405"}
                    />
                </div>
            );
        } else {
            return (
                <div className="ProjecConCon">
                    <h2>Projects</h2>
                    <div className="projects">
                    {
                        this.state.projs.map((project) => <Project id={project.id} name={project.name} desc={project.description} img={project.image}  /> ) 
                    }
                    </div>
                    
                    <div className="loadmore">
                        <BigButton text="Load More"></BigButton>     
                    </div>
                </div>
            );
        }
    }
}

export default ProjectsCon;
