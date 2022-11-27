const Item = require("../models/Items");
const Cart = require("../models/Cart");
const Account = require("../models/Accounts");
const jwt = require("jsonwebtoken");
const {
    mogooseToObject,
    mutipleMogooseObject,
} = require("../../util/mongoose");
const { application } = require("express");
const { Promise } = require("mongoose");
class Controller {
    index(req, res, next){
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }
        const token = req.cookies.token;
        const iduser = jwt.verify(token, 'mk');

        Promise.all([
            Cart.find({status: 3}),
            Cart.countDocuments({status: 3}),
            Cart.countDocuments({status: 2}),
            Cart.countDocuments({status: 1}),
            Item.countDocuments({amount: 0}),
            Account.findOne({_id: iduser}),

            Account.countDocuments({role: 2})
        ])
        .then(([cart, count, shipping, waiting, amount, acc, countRole]) =>{
            let total = 0
            cart.forEach((element) => {
                total += element.cost;
            });
            
            res.render("statistical/index", {
                total: total,
                count: count,
                shipping: shipping,
                waiting: waiting,
                amount: amount,
                acc: mogooseToObject(acc),
                countRole: countRole
            })
        })
    }
}

module.exports = new Controller();
