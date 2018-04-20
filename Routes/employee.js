const route = require('express').Router()

//Employee login
route.post('/login', function(req,res){
    var uName = req.body.username
    var password = req.body.password

    if(uName.trim().length < 1 )
        res.send("Please enter a valid username.")

    if(password.trim().length < 8)
        res.send("Please enter a valid password")

    // check if UName exists in employee table
    // check password and username are correct

    console.log(uName)
    console.log(password)

    //res.send("Got your details")
    display(uName)
    res.send("Got your details")
})

module.exports = route