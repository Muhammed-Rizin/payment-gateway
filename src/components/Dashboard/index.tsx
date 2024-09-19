import React from "react";
import "./styles.css";
import PaymentCard from "../PaymentCard";

const Dashboard = () => {
  const paymentGateways = [
    {
      link: "/razorpay",
      logo: "https://razorpay.com/newsroom-content/uploads/2020/12/output-onlinepngtools-1-1.png",
      name: "Razorpay",
      disabled: false,
    },
    {
      link: "/payu",
      logo: "https://devguide.payu.in/website-assets/uploads/2021/12/new-payu-logo.svg",
      name: "PayU",
      disabled: false,
    },
    {
      link: "/paytm",
      logo: "https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logo.svg",
      name: "Paytm",
      disabled: true,
    },
    {
      link: "/phonepe",
      logo: "https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png",
      name: "PhonePe",
      disabled: true,
    },
    {
      link: "/stripe",
      logo: "https://www.logo.wine/a/logo/Stripe_(company)/Stripe_(company)-Logo.wine.svg",
      name: "stripe",
      disabled: true,
    },

    {
      name: "PayPal",
      logo: "https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_150x38.png",
      link: "/paypal",
      disabled: true,
    },
    {
      name: "Amazon Pay",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968269.png",
      link: "/amazonpay",
      disabled: true,
    },
    {
      name: "MyFatoorah",
      logo: "https://www.myfatoorah.com/assets/img/logo.png",
      link: "/myfatoorah",
      disabled: true,
    },
    // {
    //   name: "Instamojo",
    //   logo: "https://cdn.brandfetch.io/idhBw31Y95/w/400/h/92/theme/dark/logo.png?k=id64Mup7ac&t=1667574733687?t=1667574733687",
    //   link: "/instamojo",
    //   disabled: true,
    // },
  ];
  return (
    <div className="homepage-container">
      <main className="main-content">
        <h2 className="page-title">Select a Payment Gateway</h2>
        <p className="description">
          Choose one of the payment gateways below to proceed with your payment.
        </p>

        <div className="gateway-card-container">
          {paymentGateways.map((gateway, index) => (
            <PaymentCard
              key={index}
              href={gateway.link}
              imageSrc={gateway.logo}
              altText={gateway.name}
              disabled={gateway.disabled}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
