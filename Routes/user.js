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


//LoginDetails
route.post('/login', function(req,res){
    var username = req.body.username
    var password = req.body.password

    //if username is not found in user DB, flash error message
    //if username and password do not match, flash error message

})



//SignUp method
route.post('/signUp',function(req,res){
    var uName = req.body.username
    var fName = req.body.first_name
    var lName = req.body.last_name
    var email = req.body.email
    // var DOB = 
    var gender;
    switch( parseInt(req.body.gender.toString().trim()) )
    {
        case 1 : gender = "Male"
            break
        case 2 : gender = "Female"
            break
        case 3 : gender = "Other"
            break
        case 4 : gender = "Would rather not say"
    }
    var role = "user";

    
    

    // Use flash messages to display error
    // constraints
    if(fName.trim()<3) res.send("Enter a valid first name")
    if(lName.trim()<5) res.send("Enter a valid last name")



    
})




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

    payment.card_no=req.body.card_no
    if((payment.card_no != parseInt(payment.card_no)) || (payment.card_no.toString().trim().length != 16 ))
        res.send("Enter a valid card number")

    payment.cvc_no=req.body.cvc_no
    if((payment.cvc_no != parseInt(payment.cvc_no)) || (payment.cvc_no.toString().trim().length != 3))
        res.send("Enter valid cvc number")

    res.send("Amount paid successfully")
})





//Show list of previously booked trips
route.get('/bookingHistory', function (req,res){
})

// Add sessions and sign out option  


//Exporting route
module.exports=route