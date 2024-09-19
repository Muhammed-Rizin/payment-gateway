"use client";

import React, { useState } from "react";
import { post } from "@/axios/helper";
import { loadScript } from "@/utils/loadScript";
import { APP_NAME, RAZORPAY_KEY } from "@/config/config";
import PaymentForm from "../PaymentForm";
import { InitializePaymentResponse } from "@/types/razorpay.types";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayGateway = () => {
  const [isLoading, setIsLoading] = useState(false);
  const initialValue = { name: "", email: "", mobile: "", amount: 0 };

  const initializePayment = async (formData: any): Promise<InitializePaymentResponse> => {
    const response = await post("/payments/razorpay/initialize", formData);
    return response.data;
  };

  const handlePaymentSuccess = async (response: any, formData: any) => {
    try {
      const data = {
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
      };
      await post("/payments/razorpay/verify", data);
      window.location.href = `/payment-success?amount=${formData.amount}&name=${formData.name}`;
    } catch {
      window.location.href = `/payment-failure?paymentRoute=razorpay`;
    }
  };

  const displayRazorpay = async (formData: any) => {
    setIsLoading(true);
    try {
      const loaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!loaded) throw new Error("Razorpay SDK failed to load");

      const data = await initializePayment(formData);

      const options = {
        key: RAZORPAY_KEY,
        currency: data.currency,
        amount: data.amount?.toString(),
        order_id: data.id,
        name: APP_NAME,
        description: "Thank you for your payment",
        handler: (response: any) => handlePaymentSuccess(response, formData),
        prefill: {
          name: data.name,
          email: data.email,
          phone_number: data.mobile,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", () => (window.location.href = `/payment-failure`));
    } catch (error: any) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (formData: any) => {
    displayRazorpay(formData);
  };

  return (
    <PaymentForm initialValues={initialValue} isLoading={isLoading} onSubmit={handleFormSubmit} />
  );
};

export default RazorpayGateway;
