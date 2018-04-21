// Add functions to
// Insert a booking
// Delete a booking
// Fetch history

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

module.exports={
    add_booking
}
