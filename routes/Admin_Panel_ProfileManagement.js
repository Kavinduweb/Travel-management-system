const router = require("express").Router();
const deleteUser = require("../models/Register");


// This part is Admin can suspend or delete Users 
router.route("/delete/:id").delete((req,res)=>{
    let Deleteclent= req.params.id;
    
     deleteUser.findByIdAndDelete(Deleteclent).then(()=>{
        res.json("Successfuly deleted User");
    }).catch((err)=>{
        console.log(err.message);
        res.json("Err");
    })
})

module.exports =router;