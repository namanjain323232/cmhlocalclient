import React from "react";

const ShowPaymentInfo = ({ order }) => {
  return (
    <div>
      <p className="mb-1">
        <span className="mr-2 h6">Customer Id: {order.session.customer}</span>
        {"  "}
        <span className="mr-2 font-weight-bold h6">
          Amount:
          {order.session.currency.toUpperCase()}{" "}
          {order.session.amount_total * 100}
        </span>{" "}
        {"  "}
        <span className="  mr-2 h6">
          Payment Method: {order.session.payment_method_types[0]}
        </span>{" "}
        <span className="  mr-2 h6">
          Payment Status: {order.session.payment_status.toUpperCase()}
        </span>{" "}
        <span className="badge-large bg-primary text-white h6">
          Status: {order.orderStatus}
        </span>
      </p>
    </div>
  );
};

export default ShowPaymentInfo;
