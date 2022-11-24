const Item = require("../models/Items");
const Cart = require("../models/Cart");
const Account = require("../models/Accounts");
const {
    mogooseToObject,
    mutipleMogooseObject,
} = require("../../util/mongoose");
const { application } = require("express");
const { Promise } = require("mongoose");
class Controller {
    index(req, res, next){
        // Cart.find({status: 3})
        // .then((cart)=>{
        //     let total = 0
        //     cart.forEach((element) => {
        //         total += element.cost;
        //     });
            
        //     Cart.countDocuments({status: 3}, function (err, count) {
        //         res.render("statistical/index", {total: total, count: count})
        //     });
        // })

        Promise.all([
            Cart.find({status: 3}),
            Cart.countDocuments({status: 3}),
            Cart.countDocuments({status: 2}),
            Cart.countDocuments({status: 1}),
            Item.countDocuments({amount: 0})
        ])
        .then(([cart, count, shipping, waiting, amount]) =>{
            let total = 0
            cart.forEach((element) => {
                total += element.cost;
            });
            
            res.render("statistical/index", {
                total: total,
                count: count,
                shipping: shipping,
                waiting: waiting,
                amount: amount
            })
        })
    }
}

module.exports = new Controller();
