const jwt =  require("jsonwebtoken")
const Account = require("../models/Accounts");
module.exports = function checkUser(req, res, next){
    try {
        var token = req.cookies.token
        var iduser = jwt.verify(token, 'mk')
        Account.findOne({
            _id: iduser
        })
        .then(data=>{
            if(data){
                req.data = data
                var role = req.data.role
                if(role === 1 || role === 2){
                }
                else{
                    res.json('Khong du quyen')
                    next()
                }
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
        if(token === undefined){
            res.render("login/login")

        }else{
            res.status(500).json("Token khong hop le")

        }

        console.log(err)
    }

}