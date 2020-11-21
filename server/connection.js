const mysql = require('mysql');

const conn = mysql.createConnection({
  host: "35.207.37.38",
  user: "group7",
  password: "ZG/UA8Ps5Dsj",
  database: "convention_center"
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Database is connected!");
});

module.exports = conn;
