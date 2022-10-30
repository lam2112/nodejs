const jwt =  require("jsonwebtoken")
const Account = require("../models/Accounts");
module.exports = function checkLogin(req, res, next){
    var role = req.data.role
    if(role === 1 || role === 2){
        next()
    }
    else{
        res.json('Khong du quyen')
    }
}