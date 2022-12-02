const express = require("express");
const router = express.Router();
const itemController = require("../app/controllers/itemController");

router.post("/addCart/:id", itemController.addCart)
router.post("/:id/restore", itemController.restore);
router.get("/trashs",  itemController.trash);
router.delete("/:id/force",  itemController.forceDestroy);
router.delete("/:id/delete",  itemController.destroy);
router.get("/:id/edit", itemController.edit);
router.put("/:id/update",  itemController.update);
router.get("/create",  itemController.create);
router.post("/store",  itemController.store);
router.get("/showFE",  itemController.showFE);
router.get("/show",  itemController.show);
router.get("/:slug", itemController.showOne);   

module.exports = router;
