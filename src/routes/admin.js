const express = require("express");
const router = express.Router();
const adminController = require("../app/controllers/AdminController");

router.post("/login", adminController.sendLogin)
router.get("/login", adminController.login)
router.put("/:id/update", adminController.updateUser)
router.get("/:id/edit", adminController.editUser)
router.delete("/:id/delete", adminController.deleteUser)
router.get("/show/users", adminController.showUser);
router.get("/", adminController.home);


module.exports = router;
