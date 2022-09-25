const Course = require("../models/Course");
const { mutipleMogooseObject } = require("../../util/mongoose");
const { NULL } = require("node-sass");

class MeController {
    // GET /me/stored/course
    storedCourses(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render("me/stored-courses", {
                    courses: mutipleMogooseObject(courses),
                })
            )

            .catch(next);
    }
}

module.exports = new MeController();
