const express = require("express");
const router = express.Router();

const itemController = require("../app/controllers/itemController");

// itemController.index

router.get("/:id/edit", itemController.edit);
router.put("/:id/update", itemController.update);

router.get("/create", itemController.create);
router.post("/store", itemController.store);
router.get("/show", itemController.show);
router.get("/:slug", itemController.showOne);   

module.exports = router;
