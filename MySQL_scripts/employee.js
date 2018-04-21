const mysql = require('mysql2')
const Connection = mysql.createConnection({
    host : 'localhost',
    database : 'tourandtravels',
    user : 'Avani',
    password : '1234'
})

// Check if username is unique
function checkUsername(name, cb)
{
    // Why is next statement not executing
    console.log("Username is : " + name)
    Connection.query(
        ' SELECT * FROM employee WHERE username = "' + name +'" ' , 
        function(err, rows)
        {
            if(err) cb(0)
            else cb(rows.length)
            Connection.close()
        }
    )
}

// Match username and password
function matchUsernamePassword(name,pass, cb)
{
    Connection.query(
        ' SELECT * FROM employee WHERE username = "' + name +'" AND password = "' + pass +'"' , 
        function(err, rows)
        {
            if(err) cb(0)
            else cb(rows.length)
            Connection.close()
        }
    )
}

module.exports = {
    checkUsername,
    matchUsernamePassword
}
