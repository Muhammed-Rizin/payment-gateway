export interface PaymentCardProps {
  href: string;
  imageSrc: string;
  altText: string;
  disabled: boolean;
}

export interface PaymentFormProps {
  initialValues: {
    name: string;
    email: string;
    mobile: string;
    amount?: number;
  };
  isLoading: boolean;
  onSubmit: (formData: any) => void;
}

export interface FormGroupProps {
  id: string;
  type: string;
  value: string | number;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  disabled?: boolean;
}

export interface PayuPaymentFormData {
  name: string;
  email: string;
  mobile: string;
  amount?: number;
  hash: string;
  firstName: string;
  productInfo: string;
  transactionId: string;
}
