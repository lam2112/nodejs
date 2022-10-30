const jwt =  require("jsonwebtoken")
const Account = require("../models/Accounts");
module.exports = function checkLogin(req, res, next){
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
        .catch(err=>{
            res.json("Khong lai duoc data")
            console.log(err)
        })

    } catch (err) {
        res.status(500).json("Token khong hop le ;;")
        console.log(err)
    }
    
}