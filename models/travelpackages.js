const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const travelpackageSchema = new Schema({
       packageName:{
           type: String,
           required: true
       },
       startPoint:{
        type: String,
        required: true
       },
       price:{
           type:Number,
           required:true
       },
       noOfDays:{
        type:Number,
        required:true
        },
        minimumPerson:{
            type:Number,
            required:true
        }

})

const package = mongoose.model("travelpackage",travelpackageSchema);
module.exports=package;