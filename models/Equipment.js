const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const equipmentScheema = new Schema({
    
    name : {
        type : String,
        required : true
    },
    
    description : {
        type : String,
        required : true
    },
    
    price : {
        type : Number,
        required : true
    }

})

const Equipment = mongoose.model("Equipment",equipmentScheema);

module.exports = Equipment;