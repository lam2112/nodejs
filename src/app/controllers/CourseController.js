const Course = require("../models/Course");
const {
    mogooseToObject,
    mutipleMogooseObject,
} = require("../../util/mongoose");

class CourseController {
    // GET /course/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render("courses/show", {
                    course: mogooseToObject(course),
                });
            })
            .catch((err) => {
                next = next(err);
            });
    }

    // GET /course/create
    create(req, res, next) {
        res.render("courses/create");
    }
    // POST /course/store
    store(req, res, next) {
        const formDT = req.body;
        formDT.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formDT);
        course
            .save()
            .then(() => res.redirect("/"))
            .catch((err) => {});
    }

    // GET /course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render("courses/edit", {
                    course: mogooseToObject(course),
                })
            )
            .catch(next);
    }

    // PUT /course/:id
    // https://mongoosejs.com/docs/models.html#updating
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect("/me/stored/courses"))
            .catch(next);
    }

    // DELETE /course/:id
    //https://www.npmjs.com/package/mongoose-delete
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }
}

// GET gửi yêu cầu lên server để trả lại dl cho client
// POST gửi yêu cầu lên server lưu lại/ tạo mới dl
// PUT chỉnh sửa dl hết tất cả fields
//  PATH chỉnh sửa dl từng fields

module.exports = new CourseController();
