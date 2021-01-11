import React from 'react';
import Thumbnail from './Thumbnail';

import BigButton from './BigButton';
import DotLoader from 'react-spinners/DotLoader';
import "./ProjecsCon.css";

const override = `
    display: block;
    margin: 0 auto;
    margin-top: 25px;
    border-color: red;
`;


class ProjectsCon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            projects: null,
        }
    }

    loadProjects(projs, err, loaded) {
        this.setState({
            projects: projs,
            error: err,
            isLoaded: loaded
        });
    }

    render() {
        const { error, isLoaded, projs } = this.state;
        
        //Depending on the state of the fetch request
        if (error) {
            return (
                <div className="ProjecConCon">
                    <p>Error retrieving recent projects. 😕</p>
                </div>
            );
        } else if (!isLoaded) {
            return (
                <div className="ProjecConCon">
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
                    <div className="projects">
                    {
                        this.state.projs.map((project) => <Thumbnail item={project} link='Project'/> ) 
                    }
                    </div>
                    
                    <div className="loadmore">
                        <BigButton text="Load More" shadow="false"></BigButton>
                    </div>
                </div>
            );
        }
    }
}

export default ProjectsCon;
