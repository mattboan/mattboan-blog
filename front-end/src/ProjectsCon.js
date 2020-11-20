import React from 'react';
import Project from './Project';
import "./ProjecsCon.css";

const PROJECTS = [
    {
        name: "Raspberry Pi Spy Car",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCaCObdap38GDLPqKFBihSkRpVWcZxpO9ew&usqp=CAU",
        desc: "Built a little spy car using a raspberry pi 3 and various smaller modules. Built using C++.",
        tags: [
            "C++",
            "Raspberry Pi",
        ]
    }, 
    {
        name: "MyPlants",
        img: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        desc: "MyPlants is a React Native application that works in conjunction with an ESP32 device that allows users to monitor and control their plants with ease!",
        tags: [
            "React Native",
            "ESP32",
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
            </div>
        );
    }
}

export default ProjectsCon;