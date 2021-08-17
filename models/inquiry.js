const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inquirySchema = new Schema({

    name: {
        type : String,
        required : true
    },
    nic: {
        type : String,
        required : true
    },
    phone: {
        type : Number,
        required : true
    },
    email: {
        type : String,
        reqired : true
    },
    inq: {
        type : String,
        required : true
    }
})

const Inquiry = mongoose.model("Inquiry",inquirySchema);

module.exports = Inquiry;