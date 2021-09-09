const express = require('express');
const GuideRequest = require('../models/GuideRequest');

const router =express.Router();
router.post('/add',(req,res)=>{
    let newRequest=new GuideRequest(req.body);

    newRequest.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
return res.status(200).json({
    success:"Request sent successfully"
});
    });
});

router.get('/allrequests/',(req,res)=>{
    GuideRequest.find().exec((err,posts)=>{
        if (err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            allRequests:posts
        });
    });
})



module.exports=router;

