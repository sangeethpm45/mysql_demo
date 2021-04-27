const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employe",
});
connection.connect(() => {
  console.log("connected");
});

module.exports = {
  connection
};
