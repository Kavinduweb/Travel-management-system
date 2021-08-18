const mongoose = require('mongoose');
const packagebookingSchema = new mongoose.Schema ({
    
    name:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    joinplace:{
        type:String,
        required:true
    }
    
});

module.exports = mongoose.model('packagebooking',packagebookingSchema);