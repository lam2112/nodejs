const express = require("express");
const router = express.Router();

const adminController = require("../app/controllers/AdminController");
const checkAdmin = require("../app/middleware/checkAdminMiddleware");
const checkLogin = require("../app/middleware/checkLoginMiddleware");

// courseController.index
router.get("/show/users",checkLogin, checkAdmin ,adminController.showUser);
router.get("/", checkLogin, checkAdmin, adminController.adminIndex);


module.exports = router;
