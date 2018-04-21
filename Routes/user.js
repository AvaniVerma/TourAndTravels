const express = require('express');
const route = express.Router();
const userDB = require('../MySQL_scripts/user')
const bookingDB = require('../MySQL_scripts/booking')

var username;

//LoginDetails
route.post('/login', function(req,res){
    username = req.body.username
    var password = req.body.password

    //if username is not found in user DB, flash error message
    userDB.checkUsername(req.body.username,function(data){
        if(data === 0)
            res.end("Username not found.")
    })
        
    //if username and password do not match, flash error message
    userDB.matchUsernamePassword(username, password, function(data){
        if(!data) res.end("Username or password is incorrect")
        else res.end("Logged in successfully !")

        // Save username in localstorage
    })

})



//SignUp method
route.post('/signUp',function(req,res){
    var uName = req.body.username
    var fName = req.body.first_name
    var lName = req.body.last_name
    var email = req.body.email
    var gender;

    // Constraints
    if((req.body.id != parseInt(req.body.id)) || (req.body.id.trim().length != 12))
        res.end("Please enter a valid Aadhar ID")

    if(fName.trim().length<3) res.send("Enter a valid first name")
    if(lName.trim().length<4) res.send("Enter a valid last name")

    if(uName.trim().length<5) res.end("Username must contain atleast 5 characters")
    if(req.body.password.trim().length<8) res.end("Password must contain atleast 8 characters")

    if(email.split("@")[0].length<5)
        res.end("Please enter a valid email")

    if((req.body.contact != parseInt(req.body.contact)) || (req.body.contact.toString().trim().length != 10))
        res.end("Please enter a valid mobile number ! ")


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

    // Check if Aadhar ID is unique
    userDB.checkID(req.body.id,function(data){
        if(data)
            res.end("Aadhar number already exists")
    })

    // Check if username is unique 
    userDB.checkUsername(req.body.username,function(data){
        if(data)
            res.end("Username already exists.Try a different one.")
    })

    var userObject =
    {
        user_id : req.body.id, 
        username : uName,
        password : req.body.password,
        name : fName + " " +lName,
        contact : req.body.contact,
        DOB : req.body.DOB,
        address : req.body.address,
        email : req.body.email,
        gender : gender
    }

    userDB.sign_up(userObject, function(msg){
        if(msg.success) res.end("Added successfully ! ")
        else res.end("OOPS ! An error occured. Please try again.")
    })

    // Add function to automatically login after signup
    // and save username in local storage
    
})




// Add new booking details
route.post('/booking', function (req, res) {
    var Trip = {};
    
    Trip.source = req.body.src
    Trip.destination = req.body.dest
    Trip.duration = req.body.days
    Trip.username = username
    Trip.start_date = req.body.start_date
    // Put price calculation according to distance
    Trip.price = 3000
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

    if(Trip.duration>15)
        res.send("We support trips of maximum 15 days. ")
    
    Trip.return_date=  new Date(new Date().setDate(Trip.start_date + Trip.duration))

    // Check entered date is atleast 2 days later than current
    if(Trip.start_date == new Date())
        res.send("Sorry, we cannot plan the tour with start date as today.")

    // Last date to get reimbursement
    Trip.reimbursement_date=  new Date(new Date().setDate(Trip.start_date - 2))


    // Add a constraint to check that new start_date is after the last end_date
    bookingDB.add_booking(Trip, function(data){
        if(data === null)  res.end("An error occured while booking your trip. Please try again !")
        else res.end("Trip booked successfully !")
    })
    

    //Render page for payment
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

    payment.cvc_no=req.body.cvv_no
    if((payment.cvv_no != parseInt(payment.cvv_no)) || (payment.cvv_no.toString().trim().length != 3))
        res.send("Enter valid cvv number")

    res.send("Amount paid successfully")
})





//Show list of previously booked trips
route.get('/bookingHistory', function (req,res){
    // Use expandable cards
    
})

route.get('/deleteBooking', function(req,res){
    res.send("I am in delete booking route")
})

// Add sessions and sign out option  


//Exporting route
module.exports=route