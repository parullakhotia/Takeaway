var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var customer = new mongoose.Schema({
   user: {type: Schema.Types.ObjectId,required: true, max: 1,ref:"user"},
   items:[{
   	type: mongoose.Schema.Types.ObjectId,
         ref: "items"
   }]
});

module.exports = mongoose.model("customer", customer);