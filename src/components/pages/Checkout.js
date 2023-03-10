import react, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { emptyUserCart, getuserCart } from "../../actions/user";
import { loadStripe } from "@stripe/stripe-js";
import keys from "../../config/keys";
import { getSessionId } from "../../actions/stripe";
import { assign } from "lodash";

const Checkout = ({ history }) => {
  const [vendors, setVendors] = useState([]);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState([]);

  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getCartTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  // const cartval= cart[0].subcategories

  console.log("VALUE OF CART", cart);

  useEffect(() => {
    getuserCart(user.token).then((res) => {
      setVendors(res.data.vendors);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    //remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    //remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setVendors([]);
      setTotal(0);
      toast.success("Cart is empty. Continue shopping...");
      window.setTimeout(function () {
        window.location.assign("/cart");
      }, 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FROM CHECKOUT", user.token, vendors[0].vendor.userId);
    const res = await getSessionId(user.token, vendors[0].vendor.userId);
    console.log("SESSION ID", res.data.sessionId);
    const stripe = await loadStripe(keys.REACT_APP_STRIPE_KEY);
    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then((result) => console.log("RESULT", result));
  };

  return (
    // <div classNameName="row d-flex justify-content-center">
    //    <div classNameName= "col col-md-6 ">
    //      <h4>Order Summary</h4>

    //      <hr />
    //      <h4>Helpers - {vendors.length}</h4>
    //      <hr />
    //      <h4>Selected Helpers</h4>
    //      {vendors.map((v, i) => (
    //        <div key= {i}>
    //          <b classNameName="d-flex content-align-center h6"> {v.vendor.vendorInfoId.name} [{v.vendor.subcategories[0].name}] X {v.count} = {v.vendor.price}</b>

    //        </div>
    //      ))}
    //      <hr />
    //      <p classNameName= "font-weight-bold h6">Cart Total: {total}</p>

    //      <div classNameName="row">
    //          <div classNameName="col col-md-6 mt-2">
    //            <button classNameName="btn btn-primary mt-3"
    //                   disabled= { !vendors.length}
    //                   onClick= {handleSubmit}
    //             >Place Order</button>
    //          </div>
    //          <div classNameName="col col-md-6 mt-4">
    //            <button classNameName="btn btn-primary"
    //                    disabled= {!vendors.length}
    //                    onClick= {emptyCart}
    //            >Empty Cart</button>
    //          </div>

    //      </div>
    //   </div>

    // </div>
    <div style={{ bgcolor: "#f3f3f3" }}>
      <table
        bgcolor="#f3f3f3"
        border={0}
        cellPadding={0}
        cellSpacing={10}
        className="body-table"
        style={{ height: "100%", width: "100%" }}
      >
        <tbody>
          <tr>
            <td align="center" valign="center" style={{ padding: "2rem" }}>
              <table
                bgcolor="white"
                border={0}
                cellPadding={0}
                cellSpacing={0}
                className="email-container"
                style={{
                  borderRadius: "3px",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                  WebkitBorderRadius: "3px",
                  MozBorderRadius: "3px",
                  textRendering: "optimizeLegibility",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
                width={600}
              >
                <tbody>
                  <tr>
                    <td
                      align="center"
                      valign="top"
                      style={{ paddingBottom: "1rem" }}
                    >
                      <br />
                      <table
                        bgcolor="#ffffff"
                        border={0}
                        cellPadding={0}
                        cellSpacing={0}
                        className="body"
                        style={{
                          borderRadius: "3px",
                          WebkitBorderRadius: "3px",
                          MozBorderRadius: "3px",
                          color: "#595959",
                          fontFamily: "Open Sans, Helvetica, sans-serif",
                        }}
                        width="94%"
                      >
                        <tbody>
                          <tr>
                            <td align="center" valign="top">
                              <table
                                border={0}
                                cellPadding={8}
                                cellSpacing={0}
                                className="row-blank"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td />
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                border={0}
                                cellPadding={0}
                                cellSpacing={0}
                                className="title"
                                style={{
                                  fontSize: "21px",
                                  textTransform: "uppercase",
                                }}
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top">
                                      Order Summary - &pound;{total}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                border={0}
                                cellPadding={8}
                                cellSpacing={0}
                                className="row-blank"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td />
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>

                          <tr>
                            <td align="center" valign="top">
                              <table
                                border={0}
                                cellPadding={0}
                                cellSpacing={0}
                                className="order-info"
                                style={{ fontSize: "13px" }}
                                width="92%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      align="center"
                                      valign="top"
                                      style={{
                                        fontWeight: "700",
                                        fontSize: "0.7rem",
                                      }}
                                    >
                                      Vendor
                                    </td>
                                    <td
                                      align="center"
                                      valign="top"
                                      style={{
                                        fontWeight: "700",
                                        fontSize: "0.7rem",
                                      }}
                                    >
                                      Category
                                    </td>
                                    <td
                                      align="center"
                                      valign="top"
                                      style={{
                                        fontWeight: "700",
                                        fontSize: "0.7rem",
                                      }}
                                    >
                                      Booking Date
                                    </td>
                                    <td
                                      align="center"
                                      valign="top"
                                      style={{
                                        fontWeight: "700",
                                        fontSize: "0.7rem",
                                      }}
                                    >
                                      Time Slot
                                    </td>
                                    <td
                                      align="center"
                                      valign="top"
                                      style={{
                                        fontWeight: "700",
                                        fontSize: "0.7rem",
                                      }}
                                    >
                                      Price
                                    </td>
                                  </tr>
                                  {cart.map((cartItem, l) =>
                                    cartItem.bookingSlots.map((c, i) => (
                                      <tr
                                        key={i}
                                        style={{
                                          textTransform: "uppercase",
                                          fontWeight: "bold",
                                          color: "#888888",
                                        }}
                                      >
                                        <td
                                          align="center"
                                          style={{ color: "#30ada5" }}
                                          valign="top"
                                        >
                                          {cartItem.vendorInfoId.name}
                                        </td>
                                        <td align="center" valign="top">
                                          {cartItem.subcategories[0].name}
                                        </td>
                                        <td align="center" valign="top">
                                          {c.tsday}
                                        </td>
                                        <td align="center" valign="top">
                                          {c.tstimeslot[0].startSlot} -{" "}
                                          {c.tstimeslot[0].endSlot}
                                        </td>
                                        <td align="center" valign="top">
                                          {cartItem.price}
                                        </td>
                                      </tr>
                                    ))
                                  )}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <table
                                border={0}
                                cellPadding={12}
                                cellSpacing={0}
                                className="row-blank"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td />
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <table
                                border={0}
                                cellPadding={0}
                                cellSpacing={0}
                                className="title"
                                style={{
                                  fontSize: "16px",
                                  textTransform: "uppercase",
                                }}
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top">
                                      Your Order
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                border={0}
                                cellPadding={8}
                                cellSpacing={0}
                                className="row-blank"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td />
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>

                          <tr>
                            <td align="center" valign="top">
                              <table
                                border={0}
                                cellPadding={0}
                                cellSpacing={0}
                                className="order-summary"
                                width="94%"
                              >
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top">
                                      <table
                                        border={0}
                                        cellPadding={0}
                                        cellSpacing={0}
                                        style={{ fontSize: "13px" }}
                                        width="100%"
                                      >
                                        <thead>
                                          <tr>
                                            <td
                                              align="center"
                                              colSpan={4}
                                              style={{
                                                fontWeight: "bold",
                                              }}
                                              valign="center"
                                              width="100%"
                                            />
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {/* /artwork item start */}
                                          {cart.map((cartItem, l) =>
                                            cartItem.bookingSlots.map(
                                              (c, i) => (
                                                <tr>
                                                  <td
                                                    align="center"
                                                    valign="top"
                                                  >
                                                    <img
                                                      height={120}
                                                      src={
                                                        cartItem.images[0].url
                                                      }
                                                      style={{
                                                        marginRight: "8px",
                                                        marginBottom: "0.6rem",
                                                      }}
                                                      width={120}
                                                    />
                                                  </td>
                                                  <td
                                                    align="center"
                                                    valign="top"
                                                  >
                                                    <table>
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            align="left"
                                                            style={{
                                                              fontWeight:
                                                                "bold",
                                                              fontSize: "16px",
                                                            }}
                                                            valign="top"
                                                          >
                                                            <span>
                                                              {
                                                                cartItem
                                                                  .subcategories[0]
                                                                  .name
                                                              }
                                                            </span>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td>
                                                            <span>By </span>
                                                            <span>
                                                              {
                                                                cartItem
                                                                  .vendorInfoId
                                                                  .name
                                                              }
                                                            </span>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td>
                                                            <span>
                                                              {c.tsday}
                                                            </span>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            align="left"
                                                            style={{
                                                              color: "#30ada5",
                                                              fontWeight:
                                                                "bold",
                                                            }}
                                                            valign="top"
                                                          >
                                                            <span>
                                                              {
                                                                c.tstimeslot[0]
                                                                  .startSlot
                                                              }{" "}
                                                              -{" "}
                                                              {
                                                                c.tstimeslot[0]
                                                                  .endSlot
                                                              }
                                                            </span>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                  <td
                                                    align="center"
                                                    valign="top"
                                                  >
                                                    <table>
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            align="left"
                                                            style={{
                                                              fontWeight:
                                                                "bold",
                                                              fontSize: "16px",
                                                            }}
                                                            valign="top"
                                                          >
                                                            <span></span>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            align="center"
                                                            rowSpan={4}
                                                            valign="center"
                                                          >
                                                            <table>
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    align="center"
                                                                    height={80}
                                                                    style={{
                                                                      backgroundColor:
                                                                        "#30ada5",
                                                                      color:
                                                                        "#ffffff",
                                                                      borderRadius:
                                                                        "50%",
                                                                      fontWeight:
                                                                        "bold",
                                                                      fontSize:
                                                                        "16px",
                                                                      minWidth:
                                                                        "80px",
                                                                      minHeight:
                                                                        "80px",
                                                                    }}
                                                                    valign="center"
                                                                    width={80}
                                                                  >
                                                                    <span>
                                                                      &pound;
                                                                      {
                                                                        cartItem.price
                                                                      }
                                                                    </span>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              )
                                            )
                                          )}
                                          <tr>
                                            <td>
                                              <table
                                                border={0}
                                                cellPadding={8}
                                                cellSpacing={0}
                                                className="row-blank"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td />
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="center"
                                              colSpan={4}
                                              style={{
                                                fontWeight: "bold",
                                                border: "2px solid #f3f3f3",
                                              }}
                                              valign="center"
                                              width="100%"
                                            />
                                          </tr>
                                          {/* /artwork item end */}
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <table
                                border={0}
                                cellPadding={12}
                                cellSpacing={0}
                                className="row-blank"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td />
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="center" valign="top">
                              <table
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                                border={0}
                                cellPadding={0}
                                cellSpacing={0}
                                className="btn"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      align="center"
                                      className="btn"
                                      valign="center"
                                      disabled={!vendors.length}
                                      onClick={handleSubmit}
                                    >
                                      <a
                                        className="link btn"
                                        href="#"
                                        style={{
                                          fontSize: "18px",
                                          padding: "0 5px",
                                          fontWeight: "bold",
                                          fontFamily: "Open Sans, sans-serif",
                                          color: "#ffffff",
                                          textDecoration: "none",
                                          borderRadius: "6px",
                                          WebkitBorderRadius: "3px",
                                          MozBorderRadius: "3px",
                                          backgroundColor: "#23A455",
                                          borderTop: "16px solid #23A455",
                                          borderBottom: "16px solid #23A455",
                                          borderRight: "22px solid #23A455",
                                          borderLeft: "22px solid #23A455",

                                          display: "unset !important",
                                        }}
                                      >
                                        Place order
                                      </a>
                                    </td>
                                    <td
                                      align="center"
                                      className="btn"
                                      valign="center"
                                      disabled={!vendors.length}
                                      onClick={emptyCart}
                                    >
                                      <a
                                        className="link btn"
                                        href="#"
                                        style={{
                                          fontSize: "18px",
                                          fontWeight: "bold",
                                          padding: "0 5px",
                                          fontFamily: "Open Sans, sans-serif",
                                          color: "#ffffff",
                                          textDecoration: "none",
                                          borderRadius: "3px",
                                          WebkitBorderRadius: "3px",
                                          MozBorderRadius: "3px",
                                          backgroundColor: "red",
                                          borderTop: "16px solid red",
                                          borderBottom: "16px solid red",
                                          borderRight: "22px solid red",
                                          borderLeft: "22px solid red",
                                          display: "unset !important",
                                        }}
                                      >
                                        Empty cart
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <br />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Checkout;
