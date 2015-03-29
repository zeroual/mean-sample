var User=require("../../models/user");
var router=require("express").Router();
var jwt=require('jwt-simple');
var bcrypt=require('bcrypt');

var secretKey='MySuper#Key';

// return a jwt token
router.post('/session',function(req,res,next){
    var user=User.findOne({username:req.body.username}).select('password').exec(function(err,user){
        if(err){
            return next(err);
        }
        if(!user){
            return  res.send(401);
        }
        console.log(user.password);
        console.log(req.body.password);
        bcrypt.compare(req.body.password,user.password,function(err,valid){
            if(err){
                return next(err);
            }
            if(!valid){
                console.log('i return 401');
                return res.send(401);
            }
            var token=jwt.encode({username:user.username},secretKey);
            return res.json(token);
        });

    });

});

//return info about current user
router.get('/user',function(req,res){
    var token=req.headers['x-auth'];
    var auth=jwt.decode(token,secretKey);
    User.findOne({username:auth.username},function(err,user){
        res.json(user);
    });
});

// save new User
router.post('/user',function(req,res,next){
    var user=new User({username:req.body.username,password:req.body.password});
    bcrypt.hash(user.password,10,function(err,hash){
        user.password=hash;
        user.save(function(err,user){
            if(err){
                throw next(err);
            }
            console.log(user);
            res.send(201);
        });

    });
});

module.exports=router;