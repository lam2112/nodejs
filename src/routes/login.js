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

var checkLogin = (req, res, next)=>{
    try {
        var token = req.cookies.token
        var iduser = jwt.verify(token, 'mk')
        Account.findOne({
            _id: iduser
        })
        .then(data=>{
            if(data){
                req.data = data
                next()
            }
            else{
                res.json("Khong du quyen")
            }
        })
        .catch(err=>{})

    } catch (error) {
        res.status(500).json("Token khong hop le")
    }
    
}

var checkStudent = (req, res, next) => {
    var role = req.data.role
    if(role >= 1){
        next()
    }
    else{
        res.json('Khong du quyen')
    }
}

var checkTeacher = (req, res, next) => {
    var role = req.data.role
    if(role >= 10){
        next()
    }
    else{
        res.json('Khong du quyen')
    }
}

var checkManager = (req, res, next) => {
    var role = req.data.role
    if(role >= 100){
        next()
    }
    else{
        res.json('Khong du quyen')
    }
}

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

router.get("/task", checkLogin , checkStudent, (req, res, next)=>{
    res.json("ALL stack")
})

router.get("/student", checkLogin , checkTeacher, (req, res, next)=>{
    res.json("ALL student")
})

router.get("/teacher", checkLogin , checkManager, (req, res, next)=>{
    res.json("All teacher")
})

module.exports = router;