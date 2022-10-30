const Account = require("../models/Accounts");
const jwt = require("jsonwebtoken")
const {
    mogooseToObject,
    mutipleMogooseObject,
} = require("../../util/mongoose");

class LoginController {

    login(req, res, next){
        res.render("login/login")
    }

    sendLogin(req, res, next){
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
    }

}

module.exports = new LoginController();
