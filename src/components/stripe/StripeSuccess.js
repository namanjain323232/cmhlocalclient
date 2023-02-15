import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stripeSuccessRequest } from "../../actions/stripe";
import { createOrder, emptyUserCart } from "../../actions/user";
import { LoadingOutlined } from "@ant-design/icons";
import emailjs from "@emailjs/browser";

const StripeSuccess = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const sendEmail = (cartList) => {
    let templateParams = { toEmail: user.email, emailBody: cartList };

    emailjs
      .send(
        "service_fjxllfq",
        "template_vi2wicm",
        templateParams,
        "0BQ2cd6S2bIF-l23b"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const sendVendorEmail = (vendorEmail) => {
    let templateParams = {};

    emailjs
      .send(
        "service_fjxllfq",
        "template_eqdit2i",
        templateParams,
        "0BQ2cd6S2bIF-l23b"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  {
    console.log("VENDOR FROM success page", match.params.vendor, user);
  }
  console.log("user TOKEN", user.token, match.params.vendor);
  useEffect(() => {
    stripeSuccessRequest(user.token, match.params.vendor).then((res) => {
      let cartList = JSON.parse(localStorage.getItem("cart"));

      let stringOrder = "";
      let address = user.address;
      cartList.forEach((cart) => {
        let total = cart.price * cart.count;
        stringOrder += `Vendor: ${cart.vendorInfoId.name} - ${cart.subcategories[0].name}\nYour booking is on ${cart.bookingDate} at ${cart.bookingSlots[0].tstimeslot[0].startSlot}\nOrder Total: ${total}\n\n`;
      });

      stringOrder += `Your vendor will arrive at: ${address}`;

      let vendorEmail = "";
      cartList.forEach((cart) => {
        vendorEmail += `Customer Details:\n\nName: ${user.name}\nAddress: ${address}\nContact No: ${user.phone}\n\nBooking Details:\n\n${cart.subcategories[0].name}\nBooking on: ${cart.bookingDate}\n\nTimeslot: ${cart.bookingSlots[0].tstimeslot[0].startSlot}\n\n`;
        // sendVendorEmail(vendorEmail);
        console.log(vendorEmail);
      });

      console.log(res);
      console.log(res.data);
      console.log(res.ok);
      if (res && res.data && res.data.ok) {
        console.log("RES", res.data);
        //empty cart from local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        //empty cart from redux store
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        emptyUserCart(user.token);
        sendEmail(stringOrder);
        console.log("RES from stripe success", res.data);
        history.push("/user/history");
      } else {
        history.push("/stripe/cancel");
      }
    });
  }, [match.params.vendor]);

  return (
    <div className="container">
      <div className="col">
        <LoadingOutlined className="display-1 text-danger p-5" />
      </div>
    </div>
  );
};

export default StripeSuccess;
