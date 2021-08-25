const mongoose = require('mongoose');
const activitySchema = new mongoose.Schema ({
    activityName:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },
    tour:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },

    date:{
        type:String,
        required:true
    },

    duration:{
        type:String,
        required:true
    },

    price:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('activity',activitySchema);