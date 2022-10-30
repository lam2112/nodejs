const jwt =  require("jsonwebtoken")
const Account = require("../models/Accounts");
module.exports = function checkAdmin(req, res, next){
    var role = req.data.role
    if(role === 1){
        next()
    }
    else{
        res.json('Khong du quyen')
    }
    
}