class CourseController {
    // GET /course/:slug
    show(req, res) {
        res.send("courses");
    }

}

module.exports = new CourseController();
