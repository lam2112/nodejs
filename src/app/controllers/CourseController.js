const Course = require("../models/Course");
const { mogooseObject } = require("../../util/mongoose");

class CourseController {
    // GET /course/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render("course/show", {
                    course: mogooseObject(course),
                });
            })
            .catch((err) => {
                next = next(err);
            });
    }
}

module.exports = new CourseController();
