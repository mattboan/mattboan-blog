import React from 'react';
import Project from './Project';
import BigButton from './BigButton';
import "./ProjecsCon.css";



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
        fetch('http://localhost:8080/projects')
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
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

    render() {
        const { error, isLoaded, projs } = this.state;
        
        //Depending on the state of the fetch request
        if (error) {
            return (<div>Error retrieving recent projects. 😕</div>)
        } else if (!isLoaded) {
            return (<div>Loading...</div>)
        } else {
            return (
                <div className="ProjecCon">
                    <h2>Projects</h2>
                    {
                        projs.map((project) => <Project name={project.name} desc={project.desc} img={project.img} tags={project.tags} /> ) 
                    }
                    <div className="loadmore">
                        <BigButton text="Load More"></BigButton>
                    </div>
                </div>
            );
        }
    }
}

export default ProjectsCon;
