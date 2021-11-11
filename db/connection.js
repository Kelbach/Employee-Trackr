const mysql = require('mysql2');

//connect sql database
const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'root',
  database: 'employees'
});

module.exports = db;