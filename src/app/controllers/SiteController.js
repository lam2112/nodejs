const Course = require("../models/Course");

class SiteController {
    //GET /
    index(req, res) {
        Course.find({}, function (err, result) {
            res.json(result);
        });
    }

    // res.render('home');

    // GET /search
    search(req, res) {
        res.render("search");
    }
}

module.exports = new SiteController();
