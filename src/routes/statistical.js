const express = require("express");
const router = express.Router();
const Account = require("../app/models/Accounts");
const jwt = require("jsonwebtoken")
const statisticalController = require("../app/controllers/statisticalController");
const checkLogin = require('../app/middleware/checkLoginMiddleware');

router.get("/" , statisticalController.index) 

module.exports = router;