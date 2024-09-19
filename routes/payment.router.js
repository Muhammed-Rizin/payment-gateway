import { Router } from "express";
import * as razorpayController from "../controller/razorpay.controller.js";
import * as payuController from "../controller/payu.controller.js";

const router = Router();

router.post(`/razorpay/initialize`, razorpayController.initialize);
router.post(`/razorpay/verify`, razorpayController.verifyPayments);

router.post(`/payu/initialize`, payuController.initialize);
router.post(`/payu/success`, payuController.paymentSuccess);
router.post(`/payu/failure`, payuController.paymentFailure);

export default router;
