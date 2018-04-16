const express = require('express');
const route = express.Router();

//Trip details
var today=new Date();
var Trip={  day : {
                    date: today.getDate(),
                    month: 1+today.getMonth(),
                    year: today.getFullYear()
}};

var payment={}



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

    if(Trip.duration<4)
        res.send("Trip must be longer than 3 days.")

    // Check entered date is atleast 2 days later than current

    res.send("Got the request")
})




// Payment
route.post('/payment', function(req,res){
    switch(parseInt(req.body.card_type))
    {
        case 1: payment.card_type="credit"
            break
        case 2: payment.card_type="debit"
    }

    payment.card_no=req.body.card_no.toString().trim()
    if(payment.card_no.length !=16)
        res.send("Enter valid card number")

    payment.cvc_no=req.body.cvc_no.toString().trim()
    if(payment.cvc_no.length != 3)
        res.send("Enter valid cvc number")

    //For both of the above check if the input is number only and not alphanumeric
    
    res.send("Amount paid successfully")
})





//Show list of previously booked trips
route.get('/bookingHistory', function (req,res){
})




//Exporting route
module.exports=route