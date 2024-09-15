"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import "./styles.css";

const PaymentSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const amount = searchParams.get("amount");
  const name = searchParams.get("name");

  const handleReturnHome = () => router.push("/");

  return (
    <div className="success-container">
      <div className="success-card">
        <h1 className="success-title">Payment Successful!</h1>
        <div className="success-details">
          <p className="success-message">Thank you for your payment, {name}!</p>
          <p className="amount-info">Amount Paid: ₹{amount}</p>
        </div>
        <button className="return-home-button" onClick={handleReturnHome}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
