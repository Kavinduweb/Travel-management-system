const mongoose = require('mongoose');
const travelpackageSchema = new mongoose.Schema ({
    packageName:{
        type:String,
        required:true
    },

    destination:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },

    noofdays:{
        type:Number,
        required:true
    },

    noofnights:{
        type:Number,
        required:true
    },

    vehical:{
        type:String,
        required:true
    },
    perperson:{
        type:Number,
        required:true
    }


});

module.exports = mongoose.model('travelpackage',travelpackageSchema);