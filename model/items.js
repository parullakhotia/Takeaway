var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var items=new mongoose.Schema({
   location:{type:String},
   amount:{type:Number},
   description:{type:String},
   image:{type:String}
})




module.exports = mongoose.model("items",items);