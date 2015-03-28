var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/mean_sample", function () {
    console.log("mongodb connected");
});
module.exports=mongoose;