const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  const { amount, currency = "INR" } = req.body;

  try {
    const options = {
      amount: Number(amount) * 100, // Amount in the smallest currency unit
      currency,
      receipt: `receipt_order_${new Date().getTime()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};
