var express=require("express");
var bodyParser=require("body-parser");
  

const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ankit');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("Database connection succeeded");
})
  
var app = express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/sign_up', [
    check('email', 'Email length should be 10 to 30 characters')
                    .isEmail().isLength({ min: 10, max: 30 }),
    check('name', 'Name length should be 10 to 20 characters')
                    .isLength({ min: 10, max: 20 }),
    check('phone', 'Mobile number should contains 10 digits')
                    .isLength({ min: 10, max: 10 }),
  ], function(req,res){
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect('unsuccess.html');
        console.log(errors)
        
    }

    var name = req.body.name;
    var email =req.body.email;
    var phone =req.body.phone;
  
    var data = {
        "name": name,
        "email":email,
        "phone":phone,
        
    }
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
              
    });
          
    return res.redirect('success.html');
})
  
  
app.get('/',function(req,res){
res.set({
    'Access-control-Allow-Origin': '*'
    });
return res.redirect('index.html');
}).listen(8000)
  
  
console.log("server listening at port 8000");