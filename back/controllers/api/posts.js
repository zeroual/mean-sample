var Post=require("../../models/post");
var router=require("express").Router();
//return all post in data base

router.get('/',function(req,res,next){
    Post.find().sort('-date').exec(function(err,posts){
        if(err){
            next(err);
        }
        res.json(posts);
    });
});

//save new Post in database

router.post('/',function(req,res,next){

    var post=new Post({
        body:req.body.body
    });
    post.username=req.auth.username;
    post.save(function(err,post){
        if(err){
            next(err);
        }
        res.status(201).json(post);
    });
});

module.exports=router;