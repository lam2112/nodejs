const Account = require("../models/Accounts");
const jwt = require("jsonwebtoken");
const {
    mogooseToObject,
    mutipleMogooseObject,
} = require("../../util/mongoose");
class SiteController {
    //GET /
    index(req, res, next) {
        if(req.cookies.token === undefined){
            res.render("home");
        }
        else{
            const token = req.cookies.token;
            const iduser = jwt.verify(token, 'mk');

            Account.findOne({_id: iduser})
            .then((acc)=>{
                if(acc.role === 1){
                    res.render("admin/home", {
                        acc: mogooseToObject(acc)
                    });
                }else{
 
                    res.render("user/home", {
                        acc: mogooseToObject(acc)
                    })
                }
            })
            .catch(err=>console.log(err))
        }
    }

    homeAdmin(req, res, next) {
        if(req.cookies.token == undefined){
            res.render("homeAdmin");
        }
        else{
            const token = req.cookies.token;
            const iduser = jwt.verify(token, 'mk');
    
            Account.findOne({_id: iduser})
            .then((acc)=>{
                if(acc.role === 1){
                    res.render("admin/home", {
                        acc: mogooseToObject(acc)
                    });
                }else
                    res.redirect("/login")
            })
            .catch(err=>console.log(err))

        }
    }
}

module.exports = new SiteController();
