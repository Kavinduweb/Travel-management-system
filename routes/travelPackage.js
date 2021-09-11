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

router.put('/admin/update/:id' , upload.single("packageImage"),(req,res)=>{
    TravelPackage.findByIdAndUpdate(req.params.id)
    .then((package )=> {
        package.packageName=req.body.packageName;
        package.destination=req.body.destination;
        package.discription=req.body.discription;
        package.date=req.body.date;
        package.noofdays=req.body.noofdays;
        package.noofnights=req.body.noofnights; 
        package.vehical=req.body.vehical;
        package.perperson=req.body.perperson;
        

        package
            .save()
            .then(() => res.json("The Package is UPDATED successfully"))
            .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});



module.exports=router;