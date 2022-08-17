var mysql = require("mysql");

var con = mysql.createConnection({
  host:"localhost",
  user:"username",
  password:"password",
  database:"accounts"
})
module.exports=con;
