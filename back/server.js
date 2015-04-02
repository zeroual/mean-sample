var express=require("express");
var bodyParser=require("body-parser");
var app=express();
var path = require('path');


app.use(bodyParser.json());
app.use(require('./auth'));

app.use('/api/sessions',require('./controllers/api/sessions'));
app.use('/api/users',require('./controllers/api/users'));
app.use('/api/posts',require('./controllers/api/posts'));

app.use("/assets", express.static(__dirname +'/../front/assets'));
app.use("/app", express.static(__dirname +'/../front/app'));
app.use("/views", express.static(__dirname +'/../front/views'));

var indexFile=path.resolve(__dirname +'/../front/layouts/index.html');
app.get("/",function(req,res){
    res.sendFile(indexFile);
});

app.listen(8888,function() {
    console.log("server listening on", 8888);
});