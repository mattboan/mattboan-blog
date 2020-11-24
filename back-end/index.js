'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Express init
const app = express();
const port = 8080;

//Express middleware
app.use(cors());
app.use(bodyParser.json());

//Temp globals
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

//Get recent projects
app.get('/projects', (req, res) => {
    res.json(PROJECTS);
});

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});