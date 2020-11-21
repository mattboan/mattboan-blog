import React from 'react';
import Project from './Project';
import BigButton from './BigButton';
import "./ProjecsCon.css";

const PROJECTS = [
    {
        name: "Raspberry Pi Spy Car",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCaCObdap38GDLPqKFBihSkRpVWcZxpO9ew&usqp=CAU",
        desc: "Built a little spy car using a raspberry pi 3 and various smaller modules...",
        tags: [
            {
                color: "#1b8ac2", 
                text: "C++"
            },
            {
                text: "Raspberry Pi",
                color: "#bd2b1e",
            },
        ]
    }, 
    {
        name: "MyPlants",
        img: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        desc: "MyPlants is a React Native application that works in conjunction with an ESP32...",
        tags: [
            {
                color: "#61dafb", 
                text: "React Native"
            },
            {
                text: "ESP32",
                color: "#e7352c",
            },
        ]
    }
];

class ProjectsCon extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="ProjecCon">
                <h2>Projects</h2>
                {PROJECTS.map((project) => 
                    <Project name={project.name} desc={project.desc} img={project.img} tags={project.tags} />
                )}
                <div className="loadmore">
                    <BigButton text="Load More"></BigButton>
                </div>
            </div>
        );
    }
}

export default ProjectsCon;
