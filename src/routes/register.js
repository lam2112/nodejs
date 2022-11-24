const express = require("express");
const router = express.Router();

const registerController = require("../app/controllers/RegisterController");

router.post("/", registerController.store);
router.get("/", registerController.register);

module.exports = router;