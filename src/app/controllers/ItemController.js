const Item = require("../models/Items");
const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken");
const Account = require("../models/Accounts");
const {
    mogooseToObject,
    mutipleMogooseObject,
} = require("../../util/mongoose");

class ItemController {

    show(req, res, next) {
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }
        const itemQuery = Item.find({});
        var token = req.cookies.token
        var iduser = jwt.verify(token, 'mk')

        Promise.all([
            Account.findOne({_id: iduser}),
            itemQuery
        ])
        .then(([acc, item]) => { 

            res.render("items/show", {
                item: mutipleMogooseObject(item),
                acc: mogooseToObject(acc)
            });
               
        })
        .catch((err) => {
            next = next(err);
        });
    }


    showFE(req, res, next) {
        if(typeof req.cookies.token === undefined){
            res.redirect("/login")
        }
        var token = req.cookies.token
        var iduser = jwt.verify(token, 'mk')
        Promise.all([
            Item.find({}),
            Account.findOne({_id: iduser})
        ])
        .then(([items, acc]) => {
            if(acc.role === 1){
                res.render("items/showFE", {
                    items: mutipleMogooseObject(items),
                    acc: mogooseToObject(acc)
                });
            }else{
                res.render("user/showFE", {
                    items: mutipleMogooseObject(items),
                    acc: mogooseToObject(acc)
                });
            }
        })
        .catch((err) => {
            next = next(err);
        });
    }

    showOne(req, res, next) {
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }
        var token = req.cookies.token
        var iduser = jwt.verify(token, 'mk')
        Promise.all([
            Item.findOne({ slug: req.params.slug }),
            Account.findOne({_id: iduser})
        ])
        .then(([item, acc]) => {
            if(acc.role === 1){
                res.render("items/show-one", {
                    item: mogooseToObject(item),
                    acc: mogooseToObject(acc)
                    });
                
            }else{
                res.render("user/show-one", {
                    item: mogooseToObject(item),
                    acc: mogooseToObject(acc)
                    });
            }
        })
        
        .catch((err) => {
            next = next(err);
        });
    }

    create(req, res, next) {
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }
        var token = req.cookies.token
        var iduser = jwt.verify(token, 'mk')

        Account.findOne({_id: iduser})

        .then(( acc) => {
            res.render("items/create",{
                acc: mogooseToObject(acc)
            })
        })
        .catch((err) => {
            next = next(err);
        });
    }

    store(req, res, next) {
        const item = new Item(req.body);
        item.save()
            .then(() => res.redirect("show"))
            .catch(next);
    }

    edit(req, res, next) {
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }
        var token = req.cookies.token
        var iduser = jwt.verify(token, 'mk')

        Promise.all([
      
            Item.findById(req.params.id),
            Account.findOne({_id: iduser})
        ])
        .then(([item, acc]) => {
            res.render("items/edit", {
                item: mogooseToObject(item),
                acc: mogooseToObject(acc)
            })
        })
         .catch(next);
    }

    update(req, res, next) {
        Item.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect("/items/show"))
            .catch(next); 
    }

    // DELETE /course/:id
    destroy(req, res, next) {
        Item.delete({ _id: req.params.id })
            .then(() => 
                res.redirect("back"))
            .catch(next);
    }

    trash(req, res, next) {
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }
        var token = req.cookies.token
        var iduser = jwt.verify(token, 'mk')
        Promise.all([
            Item.findDeleted({}),
            Account.findOne({_id: iduser})
        ])
            .then(([items, acc]) =>
                res.render("items/trashs", {
                    items: mutipleMogooseObject(items),
                    acc: mogooseToObject(acc)
                })
            )
            .catch(next);
    }

    // DELETE /course/:id/force
    forceDestroy(req, res, next) {
        Item.deleteOne({ _id: req.params.id })
            .then(() => 
                res.redirect("back"))
            .catch(next);
    }

    restore(req, res, next) {  
        Item.restore({ _id: req.params.id })
            .then(() => {
                res.redirect("back") }
            )
            .catch(next);
        }
        
    addCart(req, res, next) {
        if(req.cookies.token === undefined){
            res.redirect("/login")
        }
        const cart = new Cart();
        const token = req.cookies.token
        const iduser = jwt.verify(token, 'mk');
        const iditem = req.params.id;
        const nameitem = req.body.nameitem;
        const amount = req.body.amount;
        const cost = req.body.cost;
        const status = 0;

        Promise.all([
            Account.findOne({_id: iduser}),
            Item.findOne({_id: iditem})
        ])
        .then(([acc, item]) => {
            cart.iduser = iduser; 
            cart.nameuser =  acc.name;
            cart.iditem = iditem;
            cart.nameitem = nameitem;
            cart.amount = amount;
            cart.cost = amount * cost;
            cart.status = status;
            cart.address = acc.address
            cart.phoneNumber = acc.phoneNumber

            item.amount = item.amount - cart.amount
            item.save()
            cart.save()
                .then(() => {res.redirect("/cart/showCart")})
                .catch(next);
            
        }).catch((err) => {
            console.log(err)
        });
    }
}

module.exports = new ItemController();
