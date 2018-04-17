const route = require('express').Router()

//Employee login
route.post('/login', function(req,res){
    var uName = req.body.username
    var password = req.body.password

    // check if UName exists in employee table
    // check password and username are correct
})


module.exports = route