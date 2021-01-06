import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ProjectsCon from '../Components/ProjectsCon';

import './Home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return(
            <div className="Home">
                <ProjectsCon title="Highlighted Projects"></ProjectsCon>
            </div>
        );
    }
}

export default Home;
