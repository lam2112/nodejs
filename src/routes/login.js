const express = require("express");
const router = express.Router();
const Account = require("../app/models/Accounts");
const jwt = require("jsonwebtoken")
const loginController = require("../app/controllers/LoginController");
const checkLogin = require('../app/middleware/checkLoginMiddleware')

// itemController.index
router.get("/" , loginController.login)  

router.post("/" , loginController.sendLogin)  

module.exports = router;