const route = require('express').Router()
const empDB = require('../MySQL_scripts/user')

//Employee login
route.post('/login', function(req,res){
    var eName = req.body.username
    var password = req.body.password


    // Constraints
    if(eName.trim().length < 5 )
        res.end("Please enter a valid username.")

    if(password.trim().length < 8)
        res.end("Please enter a valid password")

    // check if UName exists in employee table
    empDB.checkUsername(eName,function(data){
        if(data === 0)
            res.end("Username not found in db.")
    })

    // check password and username are correct
    empDB.matchUsernamePassword(eName, password, function(data){
        if(!data) res.end("Username or password is incorrect")
        else res.end("Logged in successfully !")
    })
})

module.exports = route