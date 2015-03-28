var Post=require("../../models/post");
var router=require("express").Router();
//return all post in data base

router.get("/api/posts",function(req,res,next){
    Post.find().sort('-date').exec(function(err,posts){
        if(err){
            next(err);
        }
        res.json(posts);
    });
});

//save new Post in database

router.post("/api/posts",function(req,res,next){

    var post=new Post({
        username:req.body.username,
        body:req.body.body
    });
    post.save(function(err,post){
        if(err){
            next(err);
        }
        res.json(201,post);
    });
});

module.exports=router;