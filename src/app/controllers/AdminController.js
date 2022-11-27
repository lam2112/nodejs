const Account = require("../models/Accounts");
const jwt = require("jsonwebtoken")
const {
    mogooseToObject,
    mutipleMogooseObject,
} = require("../../util/mongoose");
const { NULL, render } = require("node-sass");

class AdminController {   
    adminIndex(req, res, next) {
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }
        try {
            res.render("admin/adminIndex")
            
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
}

    


module.exports = new AdminController();
