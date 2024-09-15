"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./styles.css";

const PaymentFailure = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paymentRoute = searchParams.get("paymentRoute") || "/";

  const handleRetryPayment = () => router.push(`${paymentRoute}`);
  const handleReturnHome = () => router.push("/");

  return (
    <div className="failure-container">
      <div className="failure-card">
        <h1 className="failure-title">Payment Failed</h1>
        <p className="failure-message">
          Oops! Something went wrong with your payment. Please try again or contact support if the
          issue persists.
        </p>
        <div className="button-group">
          <button className="retry-button" onClick={handleRetryPayment}>
            Retry Payment
          </button>
          <button className="return-home-button" onClick={handleReturnHome}>
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
