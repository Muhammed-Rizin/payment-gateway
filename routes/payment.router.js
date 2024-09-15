import { Router } from "express";
import * as controller from "../controller/payment.controller.js";

const router = Router();

router.post(`/razorpay/initialize`, controller.initialize);
router.post(`/razorpay/verify`, controller.verifyPayments);

export default router;
