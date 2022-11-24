const jwt =  require("jsonwebtoken")
const Account = require("../models/Accounts");
module.exports = function checkLogin(req, res, next){
    try {
        if(req.cookies.token){
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
                    res.render("/login")
                }
            })
            .catch(err=>{
                res.render("login/login")
                console.log("Khong lai duoc data")
                console.log(err)
            })       
    }else{
        res.render("login/login")
    }

    } catch (err) {

        res.status(500).json("Token khong hop le ;;")
        console.log(err)
    }
    
}