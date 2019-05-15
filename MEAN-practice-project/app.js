// modules imported
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var cors = require('cors');
var path = require('path');

var app = express();

var route = require('./routes/route');

mongoose.connect('mongodb://localhost:27017/contactlist');

// On connection
mongoose.connection.on('connected',()=>{
    console.log('Connected');
})
// Error
mongoose.connection.on('error',(err)=>{
    if (err){
        console.log('Error: ',err);
    }
})

const port = 3000;

// adding middleware-cors
app.use(cors());

// json parser
app.use(bodyparser.json());

// express and static files rendering
app.use(express.static(path.join(__dirname,'./public/')));

// ROUTE and CONTROLLERS
app.use('/api',route);
// app.use('/contacts',route);


app.listen(port,()=>{
    console.log('Server started at port: '+port);
});