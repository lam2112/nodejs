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
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }
        const token = req.cookies.token;
        const iduser = jwt.verify(token, 'mk');
        const onCart = 0;
        
        Promise.all([
            Cart.find({status: onCart}),
            Account.findOne({_id: iduser})
        ])
        .then(([carts, acc]) => {
            if(acc.role === 1){
                res.render("cart/showCart", {
                    carts: mutipleMogooseObject(carts),
                    acc: mogooseToObject(acc)
                });
            }else{
                Cart.find({iduser: iduser, status: onCart})
                .then((carts)=>{
                    res.render("user/showCart", {
                        carts: mutipleMogooseObject(carts),
                        acc: mogooseToObject(acc)
                    });
                }) .catch((err)=>{
                    console.log(err);
                });
            }

            
        }).catch((err) => {
            console.log(err);
        });
    }

    deleteCart(req, res, next){
        Cart.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect("back")
            })
            .catch((next)=>{
                console.log(next);
            });
    }

    transportCart(req, res, next){
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }
        const token = req.cookies.token;
        const iduser = jwt.verify(token, 'mk');
        const onCart = 0;

        Promise.all([
            Cart.find({
                status: onCart,
            }),
            Account.findOne({_id: iduser})

        ])
        .then(([carts, acc]) => {
            res.render("cart/transportCart", {
                carts: mutipleMogooseObject(carts),
                acc: mogooseToObject(acc)
            })
        }).catch((next) => {
            console.log(next);
        });
    }

    transportStatusCart(req, res, next){
        Cart.findOne({ _id: req.params.id})
            .then((cart) => {
                cart.status = 1
                cart.save()
                res.redirect("back")
            })
            .catch((next)=>{
                console.log(next);
            });
    }

    shippingCart(req, res, next){
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }
        const token = req.cookies.token;
        const iduser = jwt.verify(token, 'mk');
        const onCart = 1;

        Promise.all([
            Cart.find({
                status: onCart,
            }),
            Account.findOne({_id: iduser})

        ])
        .then(([carts, acc]) => {
            if(acc.role === 1){
                res.render("cart/shippingCart", {
                    carts: mutipleMogooseObject(carts),
                    acc: mogooseToObject(acc)
                });
            }else{
                Cart.find({iduser: iduser, status: onCart})
                .then((carts)=>{
                    res.render("user/shippingCart", {
                        carts: mutipleMogooseObject(carts),
                        acc: mogooseToObject(acc)
                    });
                }) .catch((err)=>{
                    console.log(err);
                });
            }
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
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }

        const token = req.cookies.token;
        const iduser = jwt.verify(token, 'mk');
        const onCart = 2;

        Promise.all([
            Cart.find({status: onCart}),
            Account.findOne({_id: iduser})
        ])
        .then(([carts, acc]) => {
            if(acc.role === 1){
                res.render("cart/takeCart", {
                    carts: mutipleMogooseObject(carts),
                    acc: mogooseToObject(acc)
                });
            }else{
                Cart.find({iduser: iduser, status: onCart})
                .then((carts)=>{
                    res.render("user/takeCart", {
                        carts: mutipleMogooseObject(carts),
                        acc: mogooseToObject(acc)
                    });
                }) .catch((err)=>{
                    console.log(err);
                });
            }
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

    showOne(req, res, next){
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }
        const token = req.cookies.token;
        const iduser = jwt.verify(token, 'mk');
        Promise.all([
            Cart.findOne({ _id: req.params.id}),
            Account.findOne({_id: iduser})
        ])
        .then(([cart, acc]) => {
            res.render("cart/showOne", {
                cart: mogooseToObject(cart),
                acc: mogooseToObject(acc)
            })
        })
        .catch((next)=>{
            console.log(next);
        });
    }
}

module.exports = new CartController();