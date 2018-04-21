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
            cb(rows.length)
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
            cb(rows.length)
        }
    )
}

module.exports = {
    sign_up,
    checkID,
    checkUsername
}
