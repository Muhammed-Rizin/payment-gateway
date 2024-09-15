"use client";

import React, { useState } from "react";

import { post } from "@/axios/helper";
import { loadScript } from "@/utils/loadScript";
import { APP_NAME, RAZORPAY_KEY } from "@/config/config";
import { InitializePaymentResponse, RazorpayResponse } from "@/types/RazorpayTypes";

import "./styles.css";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayGateway = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    amount: 100,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = () => {
    const { name, email, mobile, amount } = formData;
    return name && email && mobile && amount;
  };

  const initializePayment = async (): Promise<InitializePaymentResponse> => {
    return post("/payments/razorpay/initialize", formData);
  };

  const handlePaymentSuccess = async (orderId: string, response: any) => {
    try {
      const data = {
        orderCreationId: orderId,
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

  const displayRazorpay = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const loaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!loaded) throw new Error("Razorpay SDK failed to load");

      const data = await initializePayment();

      const options = {
        key: RAZORPAY_KEY,
        currency: data.currency,
        amount: data.amount?.toString(),
        order_id: data.id,
        name: APP_NAME,
        description: "Thank you for your payment",
        handler: async (response: any) => handlePaymentSuccess(data.id, response),
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
      setError(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError("Please fill in all fields");
      return;
    }
    displayRazorpay();
  };

  return (
    <div className="payment-form-container">
      <div className="payment-form-card">
        <h2>Complete Your Payment</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className={`form-group ${formData.name ? "filled" : ""}`}>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="name" className="floating-label">
              Name
            </label>
            <span className="input-bar"></span>
          </div>

          <div className={`form-group ${formData.email ? "filled" : ""}`}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email" className="floating-label">
              Email
            </label>
            <span className="input-bar"></span>
          </div>

          <div className={`form-group ${formData.mobile ? "filled" : ""}`}>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <label htmlFor="mobile" className="floating-label">
              Mobile Number
            </label>
            <span className="input-bar"></span>
          </div>

          <div className={`form-group ${formData.amount ? "filled" : ""}`}>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="1"
              required
            />
            <label htmlFor="amount" className="floating-label">
              Amount (₹)
            </label>
            <span className="input-bar"></span>
          </div>

          <button type="submit" disabled={isLoading} className="pay-button">
            {isLoading ? "Processing..." : `Pay ₹${formData.amount || "..."}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RazorpayGateway;
