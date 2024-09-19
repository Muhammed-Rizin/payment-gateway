import crypto from "crypto";

import asyncErrorHandler from "../middleware/asyncErrorHandler.js";
import { CLIENT_URL, PAYU_KEY, PAYU_SECRET } from "../config/index.js";
import { generatePayUShortOrderId } from "../helper/functions.js";

export const initialize = asyncErrorHandler(async (req) => {
  const { amount, name, email } = req.body;
  const transactionId = generatePayUShortOrderId();
  const productInfo = `Amount ${amount} payment using pay u`;

  const hashString = `${PAYU_KEY}|${transactionId}|${amount}|${productInfo}|${name}|${email}|||||||||||${PAYU_SECRET}`;
  const hash = crypto.createHash("sha512").update(hashString).digest("hex");

  return new Response("Success", { data: { hash, transactionId, productInfo } }, 200);
});

export const paymentSuccess = async (req, res) => {
  const { amount, name } = req.query;
  res.redirect(`${CLIENT_URL}/payment-success?amount=${amount}&name=${name}`);
};
export const paymentFailure = async (req, res) => {
  res.redirect(`${CLIENT_URL}/payment-failure?paymentRoute=payu`);
};
