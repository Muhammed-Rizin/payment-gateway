"use client";

import React, { useRef, useState, useEffect } from "react";
import { PAYU_URL, PAYU_KEY, API_URL } from "@/config/config";
import { post } from "@/axios/helper";
import PaymentForm from "../PaymentForm";
import { initializePaymentResponse } from "@/types/payu.types";
import { PayuPaymentFormData } from "@/types/payments.types";

const PayuGateway = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<PayuPaymentFormData>({
    name: "",
    email: "",
    mobile: "",
    hash: "",
    firstName: "",
    productInfo: "",
    transactionId: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const initializePayment = async (
    data: PayuPaymentFormData
  ): Promise<initializePaymentResponse> => {
    try {
      const response = await post(`payments/payu/initialize`, {
        amount: data.amount,
        name: data.name,
        email: data.email,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to initialize payment. Please try again.");
    }
  };

  useEffect(() => {
    if (formData.hash && formRef.current) {
      formRef.current.submit();
    }
  }, [formData.hash]);

  const handleFormSubmit = async (data: PayuPaymentFormData) => {
    setIsLoading(true);
    try {
      const response = await initializePayment(data);
      setFormData((prev) => ({
        ...prev,
        ...data,
        productInfo: response.productInfo,
        transactionId: response.transactionId,
        hash: response.hash,
      }));
    } catch (error: any) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form action={PAYU_URL} method="POST" ref={formRef}>
      <PaymentForm initialValues={formData} isLoading={isLoading} onSubmit={handleFormSubmit} />

      <input type="hidden" name="email" value={formData.email} />
      <input type="hidden" name="phone" value={formData.mobile} />
      <input type="hidden" name="firstname" value={formData.name} />
      <input type="hidden" name="key" value={PAYU_KEY} />
      <input type="hidden" name="furl" value={`${API_URL}/payments/payu/failure`} />
      <input
        type="hidden"
        name="surl"
        value={`${API_URL}/payments/payu/success?amount=${formData.amount}&name=${formData.name}`}
      />
      <input type="hidden" name="txnid" value={formData.transactionId} />
      <input type="hidden" name="productinfo" value={formData.productInfo} />
      <input type="hidden" name="hash" value={formData.hash} />
    </form>
  );
};

export default PayuGateway;
