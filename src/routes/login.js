const express = require("express");
const router = express.Router();
const loginController = require("../app/controllers/LoginController");

// itemController.index
router.get("/checkInfor", loginController.checkInfor);

router.put("/:id/updateInfor", loginController.editInfoSave);

router.get("/editInfo", loginController.editInfor);

router.put("/:id/update", loginController.changePassSave);

router.get("/changePass", loginController.changePass);

router.get("/logout", loginController.logout);

router.get("/", loginController.login);

router.post("/", loginController.sendLogin);

module.exports = router;
