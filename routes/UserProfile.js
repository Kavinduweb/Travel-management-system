const router = require("express").Router();
const User = require("../models/Register");


router.route("/Details").get((req,res)=>{

    User.find().then((Registers)=>{

        res.json(Registers);

    }).catch((err)=>{
        res.json(err);
    })

})
router.route("/Update/:Byemail").put((req,res)=>{

    let primaryEmail = req.params.Byemail;

    const Name = req.body.Name;
    const Password = req.body.Password;
    const Num = req.body.Num;

    const UpdateUser = {

        Name,
        Password,
        Num
    }

    const Update = User.findOneAndUpdate(primaryEmail,UpdateUser)
    .then(()=>{
       
        
            res.json("Updated Details");
        
    }).catch((err)=>{
        res.json("Can't Updated");

    })
   
})

    router.route("/Delete/:Byemail").delete((req,res)=>{

        let primaryEmail= req.params.Byemail;

        const deleteUser = User.findOneAndDelete(primaryEmail).then(()=>{

            res.json("User Deleted")

        }).catch((err)=>{

            req.json("Can't Delete");
        })

     })




module.exports = router;