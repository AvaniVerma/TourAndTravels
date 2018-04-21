const mysql = require('mysql2')
const Connection = mysql.createConnection({
    host : 'localhost',
    database : 'tourandtravels',
    user : 'Avani',
    password : '1234'
})

// Add booking
function add_booking(trip,cb)
{
    Connection.query(
        `INSERT INTO booking (username, source, destination, duration, start_date, return_date, price) values (
            '${trip.username}', '${trip.source}', '${trip.destination}',
            ${trip.duration}, '${trip.start_date}', '${trip.return_date}', ${trip.price})`,
            function(err, data)
            {
                if(err) cb(err)
                else cb(data)
            }
    )
}


// Add a function to check if a booking exists or not

// Delete booking
function delete_booking(trip, cb)
{
    Connection.query(
        'DELETE FROM booking WHERE username ="' + trip.username + '" AND start_date="'+trip.start_date+'"',
        function(err,rows)
        {
             if(!err) cb(1)
             else cb(0)
        }
    )
}





// Fetch history


module.exports={
    add_booking,
    delete_booking
};
