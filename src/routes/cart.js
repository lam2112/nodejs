const express = require("express");
const router = express.Router();
const CartController = require("../app/controllers/CartController");

router.get("/takeCart", CartController.takeCart);
router.post("/:id/takeCart", CartController.takeStatusCart);
router.get("/shippingCart", CartController.shippingCart);
router.post("/:id/shippingCart", CartController.shippingStatusCart);
router.get("/transportCart", CartController.transportCart);
router.post("/:id/transportCart", CartController.transportStatusCart);
router.delete("/:id/delete", CartController.deleteCart);
router.get("/showCart", CartController.showCart);

module.exports = router;
