const Course = require("../models/Course");
// const Item = require("../models/Items");
// const User = require("../models/Users");


const { mutipleMogooseObject } = require("../../util/mongoose");

const { NULL, render } = require("node-sass");

class AdminController {   
    adminIndex(req, res, next) {
        [Item, Course].find({})
            .then(function(items, courses) {
                res.render("admin/adminIndex", {
                    items: mutipleMogooseObject(items),
                    courses: mutipleMogooseObject(courses),
                });
            })
            .catch((error) => next(error));

    }

    showUser(req, res, next){
        User.find({})
            .then((users) =>
                res.render("admin/show-users", {
                    users: mutipleMogooseObject(users),
                })
            )

            .catch(next);
    }
}

    


module.exports = new AdminController();
