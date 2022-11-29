const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extnded : true}));

app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html");
});

app.post("/",function(req,res){
var firstname = req.body.fname;
var lastname = req.body.lname;
var email = req.body.email;

var data = {
  members: [
    {
      email_address: email,
      status:"subscribed",
      merge_fields:{
        FNAME : firstname,
        LNAME : lastname
      }
    }
  ]
};
var jsonData = JSON.stringify(data);
const url = "https://us18.api.mailchimp.com/3.0/lists/8ab4bf5eb4";

const options = {
  method : "POST",
  auth:"anurag: b7b5271ab40c3e4b2baf8d9c8d537cdd-us18"
}

https.request(url,options,function(response){
  response.on("data",function(data){
    console.log(JSON.parse(data));
  });
});


});






app.listen(3000,function(req,res)
{
  console.log("The server is Running");

});


// b7b5271ab40c3e4b2baf8d9c8d537cdd-us18
// 8ab4bf5eb4.0
