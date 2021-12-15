var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "[INSERT USERNAME HERE]",
    password: "[INSERT PASSWORD HERE]",
    database: "AISTestData"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;
