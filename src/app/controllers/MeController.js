const Course = require("../models/Course");
const { mutipleMogooseObject } = require("../../util/mongoose");
const { NULL } = require("node-sass");

class MeController {
    // GET /me/stored/course
    storedCourses(req, res, next) {
        Promise.all([
            Course.find({}).sortable(req), 
            Course.countDocumentsDeleted()
        ])
            .then(([courses, deletedCount])=>
                res.render("me/stored-courses", {
                    deletedCount,
                    courses: mutipleMogooseObject(courses),
                })
            )
            .catch(next);
    }
    //     Course.countDocumentsDeleted()
    //         .then((deletedCount) =>{
    //             console.log(deletedCount)
    //         })

    //     Course.find({})
    //         .then((courses) =>
    //             res.render("me/stored-courses", {
    //                 courses: mutipleMogooseObject(courses),
    //             })
    //         )

    //         .catch(next);
    // }

    // GET /me/trash/course
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render("me/trash-courses", {
                    courses: mutipleMogooseObject(courses),
                })
            )

            .catch(next);
    }
}

module.exports = new MeController();
