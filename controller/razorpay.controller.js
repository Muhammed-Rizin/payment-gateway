import shortid from "shortid";
import Razorpay from "razorpay";

import asyncErrorHandler from "../middleware/asyncErrorHandler.js";
import { RAZORPAY_KEY, RAZORPAY_SECRET } from "../config/index.js";
import { generatedRazorpaySignature } from "../helper/functions.js";

const razorpay = new Razorpay({ key_id: RAZORPAY_KEY, key_secret: RAZORPAY_SECRET });

export const initialize = asyncErrorHandler(async (req) => {
  let { amount } = req.body;
  amount = parseFloat(amount);
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    payment_capture: 1,
    receipt: shortid.generate(),
  };

  const response = await razorpay.orders.create(options);

  return new Response(
    "Success",
    { data: { id: response.id, currency: response.currency, amount: response.amount } },
    200
  );
});

export const verifyPayments = asyncErrorHandler(async (req) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

  const signature = generatedRazorpaySignature({ razorpayOrderId, razorpayPaymentId });
  if (signature !== razorpaySignature) throw new Error("Payment verification failed", 400);

  return new Response("Payment verified successfully", null, 200);
});
