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
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect("/me/stored/courses"))
            .catch(next);
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
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => 
                res.redirect("back"))
            .catch(next);
    }

    // DELETE /course/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => 
                res.redirect("back"))
            .catch(next);
    }

    // PATCH /course/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => 
                res.redirect("back"))
            .catch(next);
    }

    // POST /course/hand-form-actions
    handleFormActions(req, res, next){
        switch(req.body.action){
            case ('delete'):
                Course.delete({ _id: { $in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default: 
                res.json({ message: 'Action invalid!'});
        }
    }

}

// GET gửi yêu cầu lên server để trả lại dl cho client
// POST gửi yêu cầu lên server lưu lại/ tạo mới dl
// PUT chỉnh sửa dl hết tất cả fields
//  PATH chỉnh sửa dl từng fields

module.exports = new CourseController();
