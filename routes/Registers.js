const router = require("express").Router();
let Reg = require("../models/Register");

http://localhost:8070/Register/add

router.route("/add").post((req,res)=>{

    const Name = req.body.Name;
    const Email = req.body.Email;
    const Num =req.body.Num;
    const Password = req.body.Password;
   

    const NewAdd = new Reg({
        Name,
        Email,
        Password,
        Num,

    })

    NewAdd.save().then(()=>{
        res.json("Registration Added")
    }).catch((err)=>{
        console.log(err);
        res.json(err)
        console.log("reg err");
    })



})


module.exports = router;