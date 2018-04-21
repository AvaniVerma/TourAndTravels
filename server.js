const express=require('express')
const app=express()
const userRoute=require('./Routes/user')
const employeeRoute=require('./Routes/employee')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Load landing page
app.use('/', express.static( __dirname +  '/public_static'))

app.use('/user', userRoute)
app.use('/employee', employeeRoute)

// Server Running
app.listen(3000, function(req,res){
    console.log("Server up and running")
})