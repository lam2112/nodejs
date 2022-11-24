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
        const itemQuery = Item.find({});

        if (req.query.hasOwnProperty('_sort')){
            const isValidtype = ['asc', 'desc'].includes(req.query.type)
            itemQuery = itemQuery.sort({
                [req.query.column]: isValidtype ? req.query.type : 'default',
            })
        }

        var token = req.cookies.token
        var iduser = jwt.verify(token, 'mk')
        Account.findOne({
            _id: iduser
        }).then((account)=>{
            res.locals.account = account
        })
        
        itemQuery
        .then((item) => {
                var role = res.locals.account.role; 
                if(role === 1){
                    res.render("items/show", {
                        item: mutipleMogooseObject(item)
                    });
                }
                else{
                    res.render("items/show", {
                        item: mutipleMogooseObject(item)
                    });
                } 
                
            })
            .catch((err) => {
                next = next(err);
            });
    }

    showFE(req, res, next) {
        let itemQuery = Item.find({});
        itemQuery
            .then((items) => {
                res.render("items/showFE", {
                    items: mutipleMogooseObject(items)
                });
            })
            .catch((err) => {
                next = next(err);
            });
    }

    showOne(req, res, next) {
        Item.findOne({ slug: req.params.slug })
            .then((item) => {
                res.render("items/show-one", {
                    item: mogooseToObject(item),
                });
            })
            .catch((err) => {
                next = next(err);
            });
    }

    create(req, res, next) {
        res.render("items/create");
    }

    store(req, res, next) {
        const item = new Item(req.body);
        item.save()
            .then(() => res.redirect("show"))
            .catch(next);
    }

    edit(req, res, next) {
        Item.findById(req.params.id)
            .then((item) =>
                res.render("items/edit", {
                    item: mogooseToObject(item)
                })
            )
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
        Item.findDeleted({})
            .then((items) =>
                res.render("items/trashs", {
                    items: mutipleMogooseObject(items),
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

    // PATCH /course/:id/restore
    restore(req, res, next) {
        Item.restore({ _id: req.params.id })
            .then(() => 
                res.redirect("back"))
            .catch(next);
        }
        
    addCart(req, res, next) {

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
            cart.nameuser =  acc.name
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
