const express = require("express");
const router = express.Router();
const Account = require("/src/app/models/Accounts")

// itemController.index
router.get("/" , (req, res, next)=>{
    res.render("login/login")
})  

router.post("/" , (req, res, next)=>{
    var username = req.body.username
    var password = req.body.password
})  

module.exports = router;