const router = require("express").Router();
let Inquiry = require("../models/inquiry");


router.route("/add").post((req,res)=>{
    
    const name = req.body.name;
    const nic = req.body.nic;
    const phone = Number(req.body.phone);
    const email = req.body.email;
    const inq = req.body.inq;

    const newInquiry = new Inquiry({
        name,
        nic,
        phone,
        email,
        inq

    })

    newInquiry.save().then(()=>{
        res.json("Inquiry Added")
    }).catch((err)=>{
            console.log(err);
    })

})

router.route("/").get((req,res)=>{

    Inquiry.find().then((inquiry)=>{
        res.json(inquiry)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:id").put (async (req, res)=>{

    let userId = req.params.id;
    const {name, nic, phone, email, inq} = req.body;

    const updateInq = {
        name,
        nic,
        phone,
        email,
        inq
    }


    const update = await Inquiry.findByIdAndUpdate(userId, updateInq)
     .then(()=>{

    res.status(200).send({status: "User Updated"})

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data", error: err.message});
    })
})

    router.route("/delete/:id").delete(async(req,res)=> {
        let userId = req.params.id;

        await Inquiry.findByIdAndDelete(userId)
        .then(()=>{
            res.status(200).send({status:"User Deleted"});
        }).catch((err)=> {
            console.log(err.message);
            res.status(500).send({status:"Error with delete user", error:err.message});
        })
    
})

router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;
   const user = await Inquiry.findById(userId)
    .then((inquiry)=>{
        res.status(200).send({status: "user fetched", inquiry})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with user", error: err.message});
    })
})

module.exports = router;