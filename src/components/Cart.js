import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getVendorsTotal } from "../actions/vendor";
import VendorCardCheckout from "./cards/VendorCardCheckout";
import { userCart } from "../actions/user";

const Cart = ({ history }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getCartTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDB = () => {
    userCart(cart, user.token)
      .then((res) => {
        console.log("Cart response ZZZ", res.data);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log(err));
  };
  const showCartItems = () => (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Sub Catgeory</th>
            <th scope="col">Area</th>
            <th scope="col">Price</th>
            <th scope="col">Booking Date</th>
            <th scope="col"> Booked Timeslots</th>
            <th scope="col">Count</th>
            <th scope="col"> Remove</th>
          </tr>
        </thead>
        {cart.map((v) => (
          <VendorCardCheckout key={v._id} v={v} />
        ))}
      </table>
    </div>
  );

  return (
    <div className="container-fluid">
      <div className="row mt-2">
        <div className="col col-md-8">
          <h4>Cart / {cart.length} Vendors</h4>
          {!cart.length ? (
            <p className="h6">
              No helper selected. <Link to="/shop">Find a helper</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p className="font-weight-bold">Selected Helper</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.vendorInfoId.name} {c.subcategories[0].name} = £
                {c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total : <b> £{getCartTotal()}</b>
          <hr />
          {user ? (
            <button
              onClick={saveOrderToDB}
              className="btn btn-sm btn-primary mt-2 font-weight-bold"
              disabled={!cart.length}
            >
              Proceed to Checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-secondary font-weight-bold mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
