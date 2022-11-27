const express = require("express");
const router = express.Router();

const adminController = require("../app/controllers/AdminController");
const checkAdmin = require("../app/middleware/checkAdminMiddleware");

// courseController.index
router.put("/:id/update", adminController.updateUser)
router.get("/:id/edit", adminController.editUser)
router.delete("/:id/delete", adminController.deleteUser)
router.get("/show/users", adminController.showUser);
router.get("/", adminController.adminIndex);


module.exports = router;
