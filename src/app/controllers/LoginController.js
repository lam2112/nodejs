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

    changePass(req, res, next){
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }

        var token = req.cookies.token;
        var iduser = jwt.verify(token, 'mk');
        Account.findOne({_id: iduser})
        .then((acc) => {
            if(acc.role === 1)
                res.render("login/changePass",{
                    acc: mogooseToObject(acc)
                })
            else
            res.render("user/changePass",{
                acc: mogooseToObject(acc)
            })

        }).catch((err) => {
            console.log(err)
        });
    }

    changePassSave(req, res, next) {
        Account.updateOne({ _id: req.params.id }, req.body)
            .then(() =>{
                res.redirect("/items/showFE")
            })
            .catch(next); 
    }

    editInfor(req, res, next){
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }

        var token = req.cookies.token;
        var iduser = jwt.verify(token, 'mk');
        Account.findOne({_id: iduser})
        .then((acc) => {
            if(acc.role === 1)
                res.render("login/editInfor",{
                    acc: mogooseToObject(acc)
                })
            else
            res.render("user/editInfor",{
                acc: mogooseToObject(acc)
            })

        }).catch((err) => {
            console.log(err)
        });
    }

    editInfoSave(req, res, next) {
        Account.updateOne({ _id: req.params.id }, req.body)
            .then(() =>{
                res.redirect("/items/showFE")
            })
            .catch(next); 
    }

    checkInfor(req, res, next){
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }

        var token = req.cookies.token;
        var iduser = jwt.verify(token, 'mk');
        Account.findOne({_id: iduser})
        .then((acc) => {
            if(acc.role === 1)
                res.render("login/checkInfor",{
                    acc: mogooseToObject(acc)
                })
            else
            res.render("user/checkInfor",{
                acc: mogooseToObject(acc)
            })

        }).catch((err) => {
            console.log(err)
        });
    }

}

module.exports = new LoginController();
