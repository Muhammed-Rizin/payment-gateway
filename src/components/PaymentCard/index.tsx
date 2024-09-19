/* eslint-disable @next/next/no-img-element */

import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { PaymentCardProps } from "@/types/payments.types";

import "./styles.css";

const PaymentCard = ({ href, imageSrc, altText, disabled }: PaymentCardProps) => {
  const cardContent = (
    <div className={`payment-card ${disabled ? "disabled" : ""}`}>
      <img src={imageSrc} alt={altText} className="gateway-logo" />
    </div>
  );

  if (disabled) return <div className="card-link disabled">{cardContent}</div>;
  return <Link href={href}>{cardContent}</Link>;
};

PaymentCard.propTypes = {
  href: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

export default PaymentCard;
