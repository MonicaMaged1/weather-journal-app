// Setup empty JS object to act as endpoint for all routes
projectData = [];
const bodyParser = require('body-parser');
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3300;
app.listen(port, ()=> {
    console.log("Listening on port " + port);
})
//GET route for projectData
app.get('/all', function (req, res) {
    res.send(projectData);
})
//POST route for inserting data to projectData
app.post('/addEntry', function (req, res) {
    newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        userResponse: req.body.userResponse
    }
    projectData.push(newEntry);
    res.send(newEntry);
    console.log(projectData);
    // console.log(projectData);
    // projectData.temp =  req.body.temp;
    // projectData.date = req.body.date;
    // projectData.userResponse = req.body.userResponse;
    // console.log(projectData);

  });
  
  