const router = require("express").Router();
let Equipment = require("../models/Equipment");

router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const description = req.body.description;
    const price = Number(req.body.price);

    const newEquipment = new Equipment({

        name,
        description,
        price
    })

    newEquipment.save().then(()=>{
        res.json("Equipment Added")
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/").get((req,res)=>{

    Equipment.find().then((equipments)=>{
        res.json(equipments)
    }).catch((err)=>{
        console.log(err)
    })

})


router.route("/update/:id").put(async (req, res)=>{
    let equipmentID = req.params.id;
    const {name, description, price} = req.body;

    const updateEquipment = {
        name,
        description,
        price
    }

    const update = await Equipment.findByIdAndUpdate(equipmentID, updateEquipment)
    .then(()=>{
        res.status(200).send({status: "Equipment updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Ërror with updating data", error: err.message});
    })
})

router.delete('/delete/:id',(req,res)=>{
    Equipment.findByIdAndRemove(req.params.id).exec((err,deletedEquipment)=>{
        if(err) return res.status(400).json({
          message:"Error With Deleting Equipment",err
        });
        return res.json({
            message:"Equipment Deleted",deletedEquipment
        });
    });
});

router.get('/get/:id',(req,res)=>{
    let equipmentId=req.params.id;
    Equipment.findById(equipmentId , (err,equipment)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            equipment
        });
    });
});

module.exports = router;