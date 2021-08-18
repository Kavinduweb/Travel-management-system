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
        type:String,
        required:true
    },

    noofnights:{
        type:String,
        required:true
    },

    vehical:{
        type:String,
        required:true
    },
    perperson:{
        type:String,
        required:true
    }


});

module.exports = mongoose.model('travelpackage',travelpackageSchema);