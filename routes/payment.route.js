const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

router.post("/payment/create-order", paymentController.createOrder);

module.exports = router;
