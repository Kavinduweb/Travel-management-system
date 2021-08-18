const express = require('express');
const PackageBooking = require('../models/Packagebooking');

const router =express.Router();
router.post('/add',(req,res)=>{
    let newBooking=new PackageBooking(req.body);

    newBooking.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
return res.status(200).json({
    success:"Package Booking successfully"
});
    });
});

module.exports=router;

