import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";

const { Meta } = Card;

const VendorCalCard = ({ cal }) => {
  const start = new Date(cal.availability[0].start).toLocaleDateString();

  return (
    <Card
      actions={[
        <Link to={`/vendor/vendorcaledit/${cal._id}`}>
          <EditOutlined className="text-warning" />
        </Link>,
      ]}
    >
      <b className="mb-2">Booking Date: {start} </b>
      {cal.availability[0].timeslots &&
        cal.availability[0].timeslots.map((ts, i) => (
          <p key={ts._id + "_" + i} className="bg-info font-weight-bold ">
            {ts.startSlot}-{ts.endSlot}
          </p>
        ))}
    </Card>
  );
};

export default VendorCalCard;
