const express = require('express');
const TravelPackage = require('../models/travelpackages');
const multer = require("multer")
const router =express.Router();

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"../Travel-management-Frontend/public/uploads");
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})

const upload=multer({storage:storage});


router.post('/admin/add', upload.single("packageImage") ,(req,res)=>{
    const newTravelPackage=new TravelPackage({
        packageName:req.body.packageName,
        destination:req.body.destination,
        discription:req.body.discription,
        date:req.body.date,
        noofdays:req.body.noofdays,
        noofnights:req.body.noofnights, 
        vehical:req.body.vehical,
        perperson:req.body.perperson,
        packageImage:req.file.originalname,
    });
    newTravelPackage
    .save()
    .then(()=>res.json("New Travel Package Added"))
    .catch((err)=>res.status(400).json(`Error:${err}`));
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