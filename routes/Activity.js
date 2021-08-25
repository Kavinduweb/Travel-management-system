const express = require('express');
const Activity = require('../models/Activity');

const router =express.Router();

router.post('/add',(req,res)=>{
    let newActivity=new Activity(req.body);

    newActivity.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
return res.status(200).json({
    success:"Activity added successfully"
});
    });
});


router.get('/',(req,res)=>{
    Activity.find().exec((err,activity)=>{
        if (err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingActivity:activity
        });
    });
})

router.get('/:id',(req,res)=>{
    let ActivityId=req.params.id;
    Activity.findById(ActivityId , (err,activity)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            activity
        });
    });
});

router.put('/update/:id',(req,res)=>{
    Activity.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,activity)=>{
            if (err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Activity Update Successfull"
            });
        }
    );
});

router.delete('/delete/:id',(req,res)=>{
    Activity.findByIdAndRemove(req.params.id).exec((err,deletedActivity)=>{
        if(err) return res.status(400).json({
          message:"Activity Delete unsuccesful",err
        });
        return res.json({
            message:"Activity Delete succesful",deletedActivity
        });
    });
});



module.exports=router;