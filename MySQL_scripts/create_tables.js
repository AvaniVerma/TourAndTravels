const mysql = require('mysql2')

const connection = mysql.createConnection({
    host : 'localhost',
    database : 'tourandtravels',
    user : 'Avani',
    password : '1234'
})


// create table users
connection.query(
    `CREATE TABLE IF NOT EXISTS user (
        user_id VARCHAR(12) PRIMARY KEY, 
        username VARCHAR(15) UNIQUE,
        password VARCHAR(20),
        name VARCHAR(100),
        contact VARCHAR(10),
        DOB VARCHAR(50),
        address VARCHAR(100),
        email VARCHAR(30),
        gender VARCHAR(25)
    )`,
    function(err, results)
    {
        if(err) console.error(err)
        else console.log("User table created successfully !")
    }
)


// create table employee
connection.query(
    `CREATE TABLE IF NOT EXISTS employee (
        employee_id VARCHAR(12) PRIMARY KEY,
        username VARCHAR(15) UNIQUE,
        password VARCHAR(20),
        name VARCHAR(100),
        contact VARCHAR(10),
        DOB VARCHAR(50),
        address VARCHAR(100),
        email VARCHAR(30),
        gender VARCHAR(25)
    )`,
    function(err, results)
    {
        if(err) console.error(err)
        else console.log("Employee table created successfully !")
    }
)


// Create table Booking
connection.query(
    `create table if not exists booking(
        username VARCHAR(15),
        source VARCHAR(25) ,
        destination VARCHAR(25),
        duration INTEGER(2),
        start_date VARCHAR(50),
        return_date VARCHAR(50),
        price INTEGER,
        PRIMARY KEY (username, start_date)
    )`,
    function(err, results)
    {
        if(err) console.error(err)
        else console.log("Table booking created successfully ! ")
    }
)


// Create table travel mode
connection.query(
    `create table if not exists travel_mode(
        username VARCHAR(15),
        start_date VARCHAR(50),
        mode VARCHAR(10),
        mode_no INTEGER,
        travel_class VARCHAR(20),
        start_station VARCHAR(25),
        end_station VARCHAR(25),
        FOREIGN KEY (username, start_date) references booking(username, start_date )
    )`,
    function(err, results)
    {
         if(err) console.error(err)
        else console.log("Table travel mode created successfully ! ")
    }
)
