import React, { useState } from "react";
import FormGroup from "../FormGroup";
import { PaymentFormProps } from "@/types/payments.types";

import "./styles.css";

const PaymentForm: React.FC<PaymentFormProps> = ({ initialValues, isLoading, onSubmit }) => {
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    const { name, email, mobile, amount } = formData;
    return name && email && mobile && amount;
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      setError("Please fill in all fields.");
      return;
    }
    setError(null);
    onSubmit(formData);
  };

  return (
    <div className="payment-form-container">
      <div className="payment-form-card">
        <h2>Complete Your Payment</h2>
        {error && <p className="error-message">{error}</p>}

        <FormGroup
          id="name"
          type="text"
          value={formData.name}
          label="Name"
          onChange={handleChange}
          disabled={isLoading}
        />
        <FormGroup
          id="email"
          type="email"
          value={formData.email || ""}
          label="Email"
          onChange={handleChange}
          disabled={isLoading}
        />
        <FormGroup
          id="mobile"
          type="tel"
          value={formData.mobile || ""}
          label="Mobile Number"
          onChange={handleChange}
          disabled={isLoading}
        />
        <FormGroup
          id="amount"
          type="number"
          value={formData.amount || ""}
          label="Amount (₹)"
          onChange={handleChange}
          disabled={isLoading}
          required
        />

        <button
          type="button"
          disabled={isLoading || !isFormValid()}
          className="pay-button"
          onClick={handleSubmit}
        >
          {isLoading ? "Processing..." : `Pay ₹${formData.amount || "..."}`}
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
