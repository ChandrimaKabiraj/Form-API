var con = require("./connection.js")
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/accounts.html")
})
app.post("/",function(req,res){
  var name = req.body.name;
  var password = req.body.password;
  var email = req.body.email;
  var gender = req.body.gender;
  var phone_num = req.body.number;
  var status = "Pending";
  var date = req.body.date;

  con.connect(function(error){
    if(error) throw error
    var sql = "INSERT INTO user(name,email,gender,phone_num,password,status,date) VALUES(?,?,?,?,?,?,?)"
      con.query(sql,[name,email,gender,phone_num,password,status,date],function(error,result){
      if(error) throw error;
      let id = result.insertId
      var sql2 = "SELECT * FROM user where id = ?"
      con.query(sql2,[id],function(error,result){
        if(error) throw error;
        res.send(result);

    })
  })

})
})




app.get("/update",function(req,res){
  res.sendFile(__dirname+"/update.html")
})
app.post("/update",function(req,res){

  var name = req.body.name;
  //var password = req.body.password;
  var new_password = req.body.new_password;
  con.connect(function(error){
    if(error) throw error;
    var sql3 = "UPDATE user set password = ? where name = ? "
    con.query(sql3,[new_password,name],function(error,result){
      if(error) throw error;
      res.send("Updated User Password");
    })
})
})

app.get("/delete",function(req,res){
  res.sendFile(__dirname+"/delete.html")
})
app.post("/delete",function(req,res){

  var name = req.body.name;
  var password = req.body.password;

  con.connect(function(error){
    if(error) throw error;
    var sql4 = "DELETE  FROM user where name = ? AND password = ?"
    con.query(sql4,[name,password],function(error,result){
      if(error) throw error;
      res.send("Deleted User ");
    })
})
})

app.listen(3000);
