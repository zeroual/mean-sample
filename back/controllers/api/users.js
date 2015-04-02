var User=require("../../models/user");
var router=require("express").Router();
var jwt=require('jwt-simple');
var bcrypt=require('bcrypt');
var config=require('../../config');



//return info about current user
router.get('/',function(req,res){
    var token=req.headers['x-auth'];
    if(!token){
        return res.sendStatus(401);
    }
    var auth=jwt.decode(token,config.secretKey);
    User.findOne({username:auth.username},function(err,user){
        if(err){
            return next(err);
        }
        res.json(user);
    });
});

// save new User
router.post('/',function(req,res,next){
    var user=new User({username:req.body.username,password:req.body.password});
    bcrypt.hash(user.password,10,function(err,hash){
        user.password=hash;
        user.save(function(err,user){
            if(err){
                return next(err);
            }
            res.sendStatus(201);
        });

    });
});

module.exports=router;