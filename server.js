// Setup empty JS object to act as endpoint for all routes
projectData = {};
const bodyParser = require('body-parser');
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
//(body-parser failed to work as it is deprecated)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3300;
app.listen(port, () => {
    console.log("Listening on port " + port);
})

//POST route for inserting data to projectData
app.post('/addEntry', function (req, res) {
    projectData = {...req.body};
});

//GET route for projectData
app.get('/all', function (req, res) {
    res.send(projectData);
})
