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

router.route("/delete/:id").delete(async (req,res)=>{
    let equipmentID = req.params.id;

    await Equipment.findByIdAndDelete(equipmentID)
    .then(()=>{
       res.status(200).send({status: "Equipment deleted"}); 
    }).catch((errr)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete equipment", error: err.message});
    })
})

router.route("/get/:id").get(async (req,res)=> {
    let equipmentID = req.params.id;
    const equipment = await Equipment.findById(equipmentID)
    .then(()=>{
        res.status(200).send({status: "Equipment fetched", equipment: equipment})       
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

module.exports = router;