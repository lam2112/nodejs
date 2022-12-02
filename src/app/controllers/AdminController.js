const Account = require("../models/Accounts");
const jwt = require("jsonwebtoken")
const {
    mogooseToObject,
    mutipleMogooseObject,
} = require("../../util/mongoose");
const { NULL, render } = require("node-sass");
const { ExpressHandlebars } = require("express-handlebars");

class AdminController {   

    home(req, res, next) {
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }
        try {
            var token = req.cookies.token
            var iduser = jwt.verify(token, 'mk')
            Promise.all([
                Account.findOne({_id: iduser}),
            ])
                .then(([acc, users]) =>
                    res.render("admin/home", {
                        acc: mogooseToObject(acc),
                    
                    })
                )
    
                .catch(next);
            
        } catch (error) {
            console.log(error)
        }
    }

    showUser(req, res, next){
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }

        var token = req.cookies.token
        var iduser = jwt.verify(token, 'mk')

        Promise.all([
            Account.findOne({_id: iduser}),
            Account.find({})
        ])
            .then(([acc, users]) =>
                res.render("admin/show-users", {
                    acc: mogooseToObject(acc),
                    users: mutipleMogooseObject(users),
                })
            )

            .catch(next);
    }
    
    deleteUser(req, res, next) {
        Account.deleteOne({ _id: req.params.id })
            .then(() => 
                res.redirect("back"))
            .catch(next);
    }

    editUser(req, res, next) {
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }

        var token = req.cookies.token
        var iduser = jwt.verify(token, 'mk')

        Promise.all([
            Account.findOne({ _id: req.params.id}),
            Account.findOne({_id: iduser})
        ])
        .then(([account, acc]) =>{
            res.render("admin/editUser", {
                account: mogooseToObject(account),
                acc: mogooseToObject(acc)
            })
        })
    }

    updateUser(req, res, next) {
        Account.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect("/admin/show/users"))
            .catch(next); 
    }

    login(req, res, next){
        res.render("admin/login")
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
                if(data.role == 1) {
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
                    alert("Bạn không đủ quyền")
                }

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

    


module.exports = new AdminController();
