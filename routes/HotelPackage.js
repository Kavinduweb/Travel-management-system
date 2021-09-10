const express = require('express');
const HotelPackage = require('../models/HotelPackage');

const router =express.Router();


router.post('/add',(req,res)=>{
    let newPost=new HotelPackage(req.body);

    newPost.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
return res.status(200).json({
    success:"HotelPackage saved successfully"
});
    });
});


router.get('/',(req,res)=>{
    HotelPackage.find().exec((err,posts)=>{
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



router.get('/read/:id',(req,res)=>{
    let hotelPackageId=req.params.id;
    HotelPackage.findById(hotelPackageId , (err,HotelPackage)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            HotelPackage
        });
    });
});


router.put('/update/:id',(req,res)=>{
    HotelPackage.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,HotelPackage)=>{
            if (err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Update Successfull"
            });
        }
    );
});


router.delete('/delete/:id',(req,res)=>{
    HotelPackage.findByIdAndRemove(req.params.id).exec((err,deletedhotelPackage)=>{
        if(err) return res.status(400).json({
          message:"Delete unsuccesful",err
        });
        return res.json({
            message:"Delete succesful"
        });
    });
});


module.exports=router;