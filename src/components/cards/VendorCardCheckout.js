import React from "react";
import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";
import { CloseCircleOutlined, DeleteFilled } from "@ant-design/icons";
import moment from "moment";

const VendorCardCheckout = ({ v }) => {
  {
    console.log("VALUE OF V", v);
  }

  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    let cart = [];
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((vendor, i) => {
        if (vendor._id === v._id) cart[i].count = count;
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    console.log(v._id);
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
    }
    cart.map((vendor, i) => {
      if (vendor._id === v._id) cart.splice(i, 1);
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };

  return (
    <tbody style={{ fontSize: "0.74rem" }}>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {v.images.length ? (
              <ModalImage small={v.images[0].url} large={v.images[0].url} />
            ) : (
              ""
            )}
          </div>
        </td>
        <td>{v.vendorInfoId.name} </td>
        <td>{v.subcategories[0].name} </td>
        <td>{v.vendorInfoId.city}</td>
        <td className="font-weight-bold">
          {" "}
          £{v.price}
          {"/hr"}
          {/* , {v.pricetype} */}
        </td>
        <td>{moment(v.bookingDate).format("DD/MM/YYYY")}</td>
        <td>
          {v.bookingSlots &&
            v.bookingSlots.map(
              (bslot) =>
                bslot.tstimeslot &&
                bslot.tstimeslot.map((tslot) => (
                  <p key={tslot._id}>
                    {tslot.startSlot}- {tslot.endSlot}
                  </p>
                ))
            )}
        </td>
        {/* <td >
              <input 
                  type="number"
                  style= {{width: "80px"}}
                  className="form-control"
                  value={v.count}
                  onChange= {handleQuantityChange}
              />  
             </td> */}
        <td className="font-weight-bold">
          <DeleteFilled
            className="pointer mt-3 ml-3"
            style={{ color: "red", textAlign: "center", alignItems: "center" }}
            onClick={handleRemove}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default VendorCardCheckout;
