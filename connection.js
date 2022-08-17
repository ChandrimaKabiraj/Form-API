var mysql = require("mysql");

var con = mysql.createConnection({
  host:"localhost",
  user:"Rima",
  password:"123456789",
  database:"accounts"
})
module.exports=con;
