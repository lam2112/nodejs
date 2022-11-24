const Item = require("../models/Items");
const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken");
const Account = require("../models/Accounts");
const {
    mogooseToObject,
    mutipleMogooseObject,
} = require("../../util/mongoose");

class CartController {
    showCart(req, res, next){
        const token = req.cookies.token;
        const iduser = jwt.verify(token, 'mk');
        const onCart = 0;
        
        Promise.all([
            Cart.find({
                iduser: iduser,
                status: onCart,
            }),
            Account.findOne({_id: iduser})
        ])
        .then(([carts, acc]) => {
            res.render("cart/showCart", {
                carts: mutipleMogooseObject(carts),
                acc: acc
            })
        }).catch((next) => {
            console.log(next);
        });
    }

    deleteCart(req, res, next){
        Cart.deleteOne({ _id: req.params.id })
            .then(() => {
                console.log(req.params.id)
                res.redirect("back")
            })
            .catch((next)=>{
                console.log(next);
            });
    }

    transportCart(req, res, next){
        const token = req.cookies.token;
        const iduser = jwt.verify(token, 'mk');
        const onCart = 0;

        Cart.find({
            iduser: iduser,
            status: onCart,
        })
        .then((carts) => {
            res.render("cart/transportCart", {
                carts: mutipleMogooseObject(carts)

            })
        }).catch((next) => {
            console.log(next);
        });
    }

    transportStatusCart(req, res, next){
        Cart.findOne({ _id: req.params.id})
            .then((cart) => {
                Item.findOne({_id: cart.iditem})
                    .then((item) => {
                        item.amount = item.amount - cart.amount
                        item.save()
                    }).catch((err) => {
                        console.log(err)
                    });

                cart.status = 1
                cart.save()
                res.redirect("back")
            })
            .catch((next)=>{
                console.log(next);
            });
    }

    shippingCart(req, res, next){
        const token = req.cookies.token;
        const iduser = jwt.verify(token, 'mk');
        const onCart = 1;

        Cart.find({
            iduser: iduser,
            status: onCart,
        })
        .then((carts) => {
            res.render("cart/shippingCart", {
                carts: mutipleMogooseObject(carts)

            })
        }).catch((next) => {
            console.log(next);
        });
    }

    shippingStatusCart(req, res, next){
        Cart.findOne({ _id: req.params.id})
            .then((cart) => {
                cart.status = 2
                cart.save()
                res.redirect("back")
            })
            .catch((next)=>{
                console.log(next);
            });
    }

    takeCart(req, res, next){
        const token = req.cookies.token;
        const iduser = jwt.verify(token, 'mk');
        const onCart = 2;

        Cart.find({
            iduser: iduser,
            status: onCart,
        })
        .then((carts) => {
            res.render("cart/takeCart", {
                carts: mutipleMogooseObject(carts)

            })
        }).catch((next) => {
            console.log(next);
        });
    }

    takeStatusCart(req, res, next){
        Cart.findOne({ _id: req.params.id})
            .then((cart) => {
                cart.status = 3
                cart.save()
                res.redirect("back")
            })
            .catch((next)=>{
                console.log(next);
            });
    }
}

module.exports = new CartController();