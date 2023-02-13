import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { upcomingBookings } from "../../actions/vendorCalendar";
import { CheckOutlined } from "@ant-design/icons";
import moment from "moment";
import { markAsComplete } from "./../../actions/user";

const ShowVendorBookings = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("VALUE OF MATCH", user._id);

  useEffect(() => {
    setLoading(true);
    upcomingBookings(user._id).then((res) => setBookings(res.data));
    setLoading(false);
    console.log(bookings);
  }, []);
  const renderList = () => {
    return (
      bookings &&
      bookings.map((booking) => {
        return (
          <div
            className="row mt-1"
            style={{ marginBottom: "3rem" }}
            key={booking._id}
          >
            <div className="col col-md-7 question">
              <p>
                {"Booking Date:"}{" "}
                {moment(booking.bookingDate).format("DD/MM/YYYY")}
              </p>

              <p>
                {"Booking Time:"} {booking.timeslotsSE[0].start}
              </p>
            </div>
            <div className="col col-md-4 question">
              {booking.orderedBy.name}
              <br />
              {booking.orderedBy.email}
              <br />
              {"Address: "}
              {booking.orderedBy.address}
            </div>
            <div className=" col col-md-1 float-right ">
              <button
                className="btn btn-primary mr-1"
                onClick={(e) => {
                  e.preventDefault();
                  markAsComplete(booking._id).then((res) => {
                    setBookings(res.data);
                  });
                }}
              >
                <CheckOutlined />
              </button>
            </div>
          </div>
        );
      })
    );
  };

  return (
    <div className="row">
      <h2>Your upcoming bookings</h2>
      <div className="col col-md-9">
        {loading ? (
          <h2>Loading....</h2>
        ) : (
          <h2 className="font-weight-bold"></h2>
        )}
        <div className="container mt-2">
          <div className="row p-3 bg-light ">
            <div className="col col-md-7 ">
              <h5 className="font-weight-bold text-left">Booking Details</h5>
            </div>
            <div className="col col-md-5">
              <h5 className="font-weight-bold text-left">Customer Details</h5>
            </div>
          </div>
          <div className="card">
            <form>{renderList()}</form>
          </div>
        </div>
      </div>
      {/* <div className="col col-md-6"></div> */}
    </div>
  );
};

export default ShowVendorBookings;
