const express = require("express");
const router = express.Router();

const itemController = require("../app/controllers/itemController");
const checkLogin = require('../app/middleware/checkLoginMiddleware')
const checkAdmin = require('../app/middleware/checkAdminMiddleware')

// itemController.index

router.post("/addCart/:id", itemController.addCart)
router.patch("/:id/restore", checkLogin, itemController.restore);
router.get("/trashs", checkLogin, itemController.trash);
router.delete("/:id/force", checkLogin, itemController.forceDestroy);
router.delete("/:id/delete", checkLogin, itemController.destroy);
router.get("/:id/edit", checkLogin, itemController.edit);
router.put("/:id/update", checkLogin, itemController.update);
router.get("/create", checkLogin, itemController.create);
router.post("/store", checkLogin, itemController.store);
router.get("/showFE", checkLogin, itemController.showFE);
router.get("/show", checkLogin, itemController.show);
router.get("/:slug", checkLogin, itemController.showOne);   

module.exports = router;
