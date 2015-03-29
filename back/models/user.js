var mongoose=require('mongoose');
var db=require("../db");
var user=mongoose.Schema({
    username:String,
    password:{type:String,select:false}
});
module.exports=mongoose.model('User',user);
