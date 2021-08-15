const router=require("express").Router();
let Package = require("../models/travelpackages");

router.route("/add").post((req,res)=>{
     const packageName = req.body.packageName;
     const startPoint = req.body.startPoint;
     const price = Number(req.body.price);
     const noOfDays = Number(req.body.noOfDays);
     const minimumPerson = Number(req.body.minimumPerson);

     const newPackage = new Package({

        packageName,
        startPoint,
        price,
        noOfDays,
        minimumPerson
     })

     newPackage.save().then(()=>{
         res.json("Travel Package Added")
     }).catch((err)=>{
         console.log(err);
     })
})

router.route("/").get((req,res)=>{
    Package.find().then((packages)=>{
        res.json(packages)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/updatepackages/:id").put(async(req,res)=>{
    let packageId= req.params.id;
    const {packageName,startPoint,price,noOfDays,minimumPerson}=req.body;

    const updateTravelPackage = {
        packageName,
        startPoint,
        price,
        noOfDays,
        minimumPerson
    }
    await Package.findByIdAndUpdate(packageId, updateTravelPackage).then(()=>{
        res.status(200).send({status: "Package Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error: err.message});
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let packageId= req.params.id;
    
    await Package.findByIdAndDelete(packageId).then(()=>{
        res.status(200).send({status:"Package Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"error with deleting", error: err.message});
    })
})

router.route("/get/:id").get(async (req,res)=>{
    let packageId= req.params.id;
    const Opackage = await Package.findById(packageId).then((Opackage)=>{
        res.status(200).send({status:"package Fetched",Opackage})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"error with get package", error: err.message});
    })
})

module.exports=router; 