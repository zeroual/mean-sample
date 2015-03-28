var express=require("express");
var bodyParser=require("body-parser");
var Post=require("./models/post.js");

var app=express();
app.use(bodyParser.json());

app.get("/api/posts", function (req, res,next) {
    Post.find().sort('-date').exec(function(err,posts){
        if(err){
            return next(err);
        }
        res.json(posts);
    });
});

app.post("/api/posts", function (req,res,next) {
    var post=new Post(
        {
            username:req.body.username,
            body:req.body.body
        }
    );
    post.save(function (err,post) {
        if(err){
            return next(err);
        }
        res.send(201,post);
    });
});
app.use("/assets", express.static(__dirname + '/assets'));

app.get("/",function(req,res){
    res.sendFile('posts.html', {'root': __dirname});
});

app.listen(8888,function() {
    console.log("server listening on", 8888);
});