var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var Schema = mongoose.Schema;


var user = new mongoose.Schema({
   username: {type:String,required:true},
   emailid:{type:String,required:true,unique:true,trim: true},
   password:{type:String},
   phonenumber:{type:Number},
   userType: {type: String, enum: ['seller', 'buyer'], required: true}
});



user.plugin(passportLocalMongoose)
module.exports = mongoose.model("user", user);
