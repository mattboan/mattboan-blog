const express = require('express');
const bodyParser = require('body-parser');

//Express init
const app = express();
const port = 8080;

//Express middleware
app.use(bodyParser.json());

//Routes
app.get('/projects', (req, res) => {
    const projects = [
        {
            name: 'Raspberry Pi Spy Car',
            desc: '',
            tags: [
                {
                    name: 'C++',
                    color: 'blue'
                },
                {
                    name: 'Raspberry Pi',
                    color: 'red',
                }
            ]
        }, 
    ]; 

    //Send projects to response
    res.json(projects[0]);
});

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});