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

                var name = data.name;
                return res.json({
                    token: token,
                    name: name,
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

    logout(req, res, next) {
        res.render("login/logout")
    }

}

module.exports = new LoginController();
