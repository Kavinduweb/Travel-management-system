const express = require('express');
const Guide = require('../models/Guide');

const router =express.Router();

router.post('/add',(req,res)=>{
    let newGuide=new Guide(req.body);

    newGuide.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
return res.status(200).json({
    success:"Guide added successfully"
});
    });
});


router.get('/',(req,res)=>{
    Guide.find().exec((err,guides)=>{
        if (err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingGuide:guides
        });
    });
})

router.get('/:id',(req,res)=>{
    let guideId=req.params.id;
    Guide.findById(guideId , (err,guide)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            guide
        });
    });
});

router.put('/update/:id',(req,res)=>{
    Guide.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,guide)=>{
            if (err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Guide Update Successfull"
            });
        }
    );
});

router.delete('/delete/:id',(req,res)=>{
    Guide.findByIdAndRemove(req.params.id).exec((err,deletedGuide)=>{
        if(err) return res.status(400).json({
          message:"Guide Delete unsuccesful",err
        });
        return res.json({
            message:"Guide Delete succesful",deletedGuide
        });
    });
});



module.exports=router;