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
    Trip.package = req.body.package
    
    switch(parseInt(req.body.travelVia))
    {
        case 1: Trip.travelMode="Airplane"
            break;
        case 2: Trip.travelMode="Train"
            break;
        case 3: Trip.travelMode="Bus"
    }
    
    // Add a check to see duration >=4
    // if(Trip.duration<4)
    // add error message to some div on screen

    // Check entered date is atleast 2 days later than current

    console.log(Trip)
    res.send("Got the request")
})


route.get('/bookingHistory', function (req,res){

})


//Exporting route
module.exports=route