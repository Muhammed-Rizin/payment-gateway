import { FormGroupProps } from "@/types/payments.types";
import React from "react";

const FormGroup: React.FC<FormGroupProps> = ({
  id,
  type,
  value,
  label,
  onChange,
  required = true,
  disabled = false,
}) => (
  <div className={`form-group ${value ? "filled" : ""}`}>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
    />
    <label htmlFor={id} className="floating-label">
      {label}
    </label>
    <span className="input-bar"></span>
  </div>
);

export default FormGroup;
