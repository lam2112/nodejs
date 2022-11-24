const Item = require("../models/Items");
const Account = require("../models/Accounts");
const {
    mogooseToObject,
    mutipleMogooseObject,
} = require("../../util/mongoose");
class SiteController {
    //GET /
    index(req, res, next) {

        Item.find({})
        .then((items) => {
            res.render("home", {
                items: mutipleMogooseObject(items)
            });
        })
        .catch((err) => {
            next = next(err);
        });
   
    }

    // GET /search
    search(req, res) {
        res.render("search");
    }
}

module.exports = new SiteController();
