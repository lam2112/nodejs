const express = require("express");
const router = express.Router();

const adminController = require("../app/controllers/AdminController");
const checkAdmin = require("../app/middleware/checkAdminMiddleware");

// courseController.index
router.get("/show/users", adminController.showUser);
router.get("/", adminController.adminIndex);


module.exports = router;
