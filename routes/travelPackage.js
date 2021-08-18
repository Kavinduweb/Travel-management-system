const express = require('express');
const TravelPackage = require('../models/travelpackages');

const router =express.Router();

router.post('admin/add',(req,res)=>{
    let newPackage=new TravelPackage(req.body);

    newPackage.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
return res.status(200).json({
    success:"Package added successfully"
});
    });
});


router.get('/',(req,res)=>{
    TravelPackage.find().exec((err,posts)=>{
        if (err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPackage:posts
        });
    });
})

router.get('/admin/:id',(req,res)=>{
    let packageId=req.params.id;
    TravelPackage.findById(packageId , (err,post)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            post
        });
    });
});

router.put('/admin/update/:id',(req,res)=>{
    TravelPackage.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,post)=>{
            if (err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Package Update Successfull"
            });
        }
    );
});

router.delete('/admin/delete/:id',(req,res)=>{
    TravelPackage.findByIdAndRemove(req.params.id).exec((err,deletedPost)=>{
        if(err) return res.status(400).json({
          message:"Package Delete unsuccesful",err
        });
        return res.json({
            message:"Package Delete succesful",deletedPost
        });
    });
});



module.exports=router;