export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface InitializePaymentResponse {
  id: string;
  amount: number;
  currency: string;
  name: string;
  email: string;
  mobile: string;
}

export type RazorpayHandler = (response: RazorpayResponse) => Promise<void>;
