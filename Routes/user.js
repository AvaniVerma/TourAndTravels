const express = require('express');
const route = express.Router();

//Trip details
var today=new Date();
var Trip={  day : {
                    date: today.getDate(),
                    month: 1+today.getMonth(),
                    year: today.getFullYear()
}};


// Add new booking details
route.post('/booking', function (req, res) {
    Trip.source = req.body.src
    Trip.destination = req.body.dest
    Trip.duration = req.body.days
    
    res.send("Got the request")
    // Save this data and load the page to fetch package details
})
  

//Exporting route
module.exports=route