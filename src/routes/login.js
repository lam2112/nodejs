const express = require("express");
const router = express.Router();
const Account = require("../app/models/Accounts");
const jwt = require("jsonwebtoken")

// itemController.index
router.get("/" , (req, res, next)=>{
    res.render("login/login")
})  

router.post("/" , (req, res, next)=>{
    var username = req.body.username
    var password = req.body.password

    Account.findOne({
        username: username,
        password: password
    })
    .then(data => {

        if(data){
            var token = jwt.sign({
                _id: data.id,

            }, 'mk')
            return res.json({
                message: "Dang nhap thanh cong",
                token: token
            })
        }
        else{
            return res.json("Dang nhap that bai")
        }
    })
    .catch(err => {
        res.status(500).json("Loi server")
    })
})  

router.get("/private", (req, res, next)=>{
    try{
        var token = req.cookies.token
        var ketqua = jwt.verify(token, "mk")
        if(ketqua){
            next()
        }
    }
    catch(err){
        res.json("Chua login")
    }
}, (req, res, next)=>{
    res.json("wellcom")
})

module.exports = router;