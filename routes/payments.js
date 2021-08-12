const router = require("express").Router();
let Payment = require("../models/Payment");

http://localhost:8070/payment/add

router.route("/add").post((req,res)=>{

    const reference = req.body.reference;
    const name = req.body.name;
    const payf = req.body.payf;
    const method = req.body.method;
    const card = Number(req.body.card);
    const time = req.body.time;
    const no = Number(req.body.no);
    const amount = Number(req.body.amount);

    const newPayment = new Payment({
        reference,
        name,
        payf,
        method,
        card,
        time,
        no,
        amount

    })

    newPayment.save().then(()=>{
        res.json("Payment Added")
    }).catch((err)=>{
        console.log(err);
    })

})

http://localhost:8070/payment

router.route("/").get((req,res)=>{
    Payment.find().then((payments)=>{
        res.json(payments)
    }).catch((err)=>{
        console.log(err)
    })
})

http://localhost:8070/payment/update

router.route("/update/:id").put(async(req,res)=>{
    let ref = req.params.id;
    const { reference,name,payf,method, card, time,val, amount} = req.body;

    const updatePayment = {
        reference,
        name,
        payf,
        method,
        card,
        time,
        no,
        amount
    }

    const update = await Payment.findByIdAndUpdate(ref, updatePayment)
    .then(()=>{
        res.status(200).send({status:"Payment updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating", error: err.message});
    })
    
         
})

http://localhost:8070/payment/delete

router.route("/delete/:id").delete(async(req,res)=>{
    let ref = req.params.id;

    await Payment.findByIdAndDelete(ref)
    .then(()=>{
        res.status(200).send({status: "Payment deleted"});    
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with payment delete"})
    })

})

http://localhost:8070/payment/update/:id

router.route("/get/:id").get(async(req,res)=>{
    let ref = req.params.id;
   const pay = await Payment.findById(ref)
    .then((payment)=>{
        res.status(200).send({status: "Payment fetched", payment})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with payment", error: err.message});
    })
})

module.exports = router;