var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var kabaadi = new mongoose.Schema({
   user: {type: Schema.Types.ObjectId,required: true, max: 1,ref:"user"},
   location: {
     type:String
   },
   rate:{
   type:Number
   },
   maxdeliverycircle:{
   type:Number
   },
   phonenumber:{
    type:Number
   }
});

module.exports = mongoose.model("kabaadi", kabaadi);