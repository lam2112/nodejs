const Item = require("../models/Items");
const Course = require("../models/Course");

const moment = require('moment');

const {
    mogooseToObject,
    mutipleMogooseObject,
} = require("../../util/mongoose");
const Items = require("../models/Items");
class ItemController {
    
    show(req, res, next) {
        let itemQuery = Item.find({});

        if (req.query.hasOwnProperty('_sort')){
            const isValidtype = ['asc', 'desc'].includes(req.query.type)
            itemQuery = itemQuery.sort({
                [req.query.column]: isValidtype ? req.query.type : 'default',
            })
        }

        itemQuery
            .then((item) => {
                res.render("items/show", {
                    item: mutipleMogooseObject(item)
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

    // POST /course/hand-form-actions
    handleFormActions(req, res, next){
        switch(req.body.action){
            case ('delete'):
                Course.delete({ _id: { $in: req.body.itemIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default: 
                res.json({ message: 'Action invalid!'});
        }
    }
}

module.exports = new ItemController();
