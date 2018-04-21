const mysql = require('mysql2')
const Connection = mysql.createConnection({
    host : 'localhost',
    database : 'tourandtravels',
    user : 'Avani',
    password : '1234'
})


// Add new user
function sign_up(newUser, cb)
{
    Connection.query(
        `INSERT INTO user (user_id, username, password, 
        name, contact, DOB, address, email, gender) values (
            '${newUser.user_id}' , '${newUser.username}' ,'${newUser.password}' ,
            '${newUser.name}' ,${newUser.contact} ,'${newUser.DOB}' ,
            '${newUser.address}' ,'${newUser.email}' ,'${newUser.gender}' 
        )`,
        function(err, rows,fields)
        {
            if(err) cb({ success : false })
            else cb({success : true})
            Connection.close()
        }
    )
}


//Check if ID is unique
function checkID(id, cb)
{
    Connection.query(
        `SELECT * FROM user WHERE user_id = ` + id, 
        function(err, rows)
        {
            if(err) cb(0)
            else cb(rows.length)
            Connection.close()
        }
    )
}


// Check if username is unique
function checkUsername(username, cb)
{
    Connection.query(
        ' SELECT * FROM user WHERE username = "' + username +'" ' , 
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
        ' SELECT * FROM user WHERE username = "' + name +'" AND password = "' + pass +'"' , 
        function(err, rows)
        {
            if(err) cb(0)
            else cb(rows.length)
            Connection.close()
        }
    )
}

module.exports = {
    sign_up,
    checkID,
    checkUsername,
    matchUsernamePassword
}
