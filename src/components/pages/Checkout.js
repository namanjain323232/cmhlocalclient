import react, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { emptyUserCart, getuserCart } from "../../actions/user";
import { loadStripe } from "@stripe/stripe-js";
import keys from "../../config/keys";
import { getSessionId } from "../../actions/stripe";

const Checkout = ({ history }) => {
  // const [vendors, setVendors] = useState([]);
  // const [total, setTotal] = useState(0);
  // const [name, setName] = useState([]);

  // const dispatch = useDispatch();

  // const { user } = useSelector((state) => ({ ...state }));

  // useEffect(() => {
  //   getuserCart(user.token).then((res) => {
  //     setVendors(res.data.vendors);
  //     setTotal(res.data.cartTotal);
  //   });
  // }, []);

  // const emptyCart = () => {
  //   //remove from local storage
  //   if (typeof window !== "undefined") {
  //     localStorage.removeItem("cart");
  //   }
  //   //remove from redux
  //   dispatch({
  //     type: "ADD_TO_CART",
  //     payload: [],
  //   });
  //   // remove from backend
  //   emptyUserCart(user.token).then((res) => {
  //     setVendors([]);
  //     setTotal(0);
  //     toast.success("Cart is empty. Continue shopping...");
  //   });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("FROM CHECKOUT", user.token, vendors[0].vendor.userId);
  //   const res = await getSessionId(user.token, vendors[0].vendor.userId);
  //   console.log("SESSION ID", res.data.sessionId);
  //   const stripe = await loadStripe(keys.REACT_APP_STRIPE_KEY);
  //   stripe
  //     .redirectToCheckout({
  //       sessionId: res.data.sessionId,
  //     })
  //     .then((result) => console.log("RESULT", result));
  // };

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
        style={{ height: "120%", width: "100%" }}
      >
        <tbody>
          <tr>
            <td align="center" valign="center">
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
                  {/* <tr>
                    <td align="center" valign="top">
                      <table
                        border={0}
                        cellPadding={0}
                        cellSpacing={0}
                        className="header"
                        width="100%"
                      >
                        <tbody> */}
                  {/* <tr>
                            <td align="center" valign="top">
                              <table
                                border={0}
                                cellPadding={10}
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
                                className="logo"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top">
                                      <img
                                        src="https://gallery.mailchimp.com/48ab94c0e9f0753bc6532ca71/images/bbd16fd9-107c-4d6d-a9c7-b09417c01c63.png"
                                        width={108}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                border={0}
                                cellPadding={6}
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
                                className="content"
                                width="92%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      align="center"
                                      style={{
                                        color: "#595959",
                                        fontFamily:
                                          "Open Sans, Helvetica, sans-serif",
                                        fontSize: "16px",
                                      }}
                                      valign="center"
                                    >
                                      Thank you for living your Passion
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                border={0}
                                cellPadding={10}
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
                        </tbody>
                      </table>
                    </td>
                  </tr> */}
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
                                      Order Summary
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
                                    <td align="center" valign="top">
                                      Order Ref.
                                    </td>
                                    <td align="center" valign="top">
                                      Paid with
                                    </td>
                                    <td align="center" valign="top">
                                      Order Date
                                    </td>
                                    <td align="center" valign="top">
                                      No. of Items
                                    </td>
                                    <td align="center" valign="top">
                                      Grand Total
                                    </td>
                                  </tr>
                                  <tr
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
                                      qwer1234
                                    </td>
                                    <td align="center" valign="top">
                                      qwer1234
                                    </td>
                                    <td align="center" valign="top">
                                      qwer1234.
                                    </td>
                                    <td align="center" valign="top">
                                      qwer1234
                                    </td>
                                    <td align="center" valign="top">
                                      qwer1234
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
                                                border: "2px solid #f3f3f3",
                                              }}
                                              valign="center"
                                              width="100%"
                                            />
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {/* /artwork item start */}
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
                                            <td align="center" valign="top">
                                              <img
                                                height={120}
                                                src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/Capacities_%28album%29.jpg/220px-Capacities_%28album%29.jpg"
                                                style={{ marginRight: "8px" }}
                                                width={120}
                                              />
                                            </td>
                                            <td align="center" valign="top">
                                              <table>
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      align="left"
                                                      style={{
                                                        fontWeight: "bold",
                                                        fontSize: "16px",
                                                      }}
                                                      valign="top"
                                                    >
                                                      <span>
                                                        The Coffee shop
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <span>By</span>
                                                      <span>Rody Duterte</span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <span>
                                                        Oil Painting on Canvas
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      align="left"
                                                      style={{
                                                        color: "#30ada5",
                                                        fontWeight: "bold",
                                                      }}
                                                      valign="top"
                                                    >
                                                      <span>$102</span>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                            <td align="center" valign="top">
                                              <table>
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      align="left"
                                                      style={{
                                                        fontWeight: "bold",
                                                        fontSize: "16px",
                                                      }}
                                                      valign="top"
                                                    >
                                                      <span>Total Items</span>
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
                                                              <span>$122</span>
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
                                    >
                                      <a
                                        className="link btn"
                                        href="#"
                                        style={{
                                          fontSize: "13px",
                                          fontWeight: "bold",
                                          fontFamily: "Open Sans, sans-serif",
                                          color: "#ffffff",
                                          textDecoration: "none",
                                          borderRadius: "3px",
                                          WebkitBorderRadius: "3px",
                                          MozBorderRadius: "3px",
                                          backgroundColor: "#30ada5",
                                          borderTop: "16px solid #30ada5",
                                          borderBottom: "16px solid #30ada5",
                                          borderRight: "22px solid #30ada5",
                                          borderLeft: "22px solid #30ada5",
                                          display: "inline-block",
                                        }}
                                      >
                                        Place order
                                      </a>
                                    </td>
                                    <td
                                      align="center"
                                      className="btn"
                                      valign="center"
                                    >
                                      <a
                                        className="link btn"
                                        href="#"
                                        style={{
                                          fontSize: "13px",
                                          fontWeight: "bold",
                                          fontFamily: "Open Sans, sans-serif",
                                          color: "#ffffff",
                                          textDecoration: "none",
                                          borderRadius: "3px",
                                          WebkitBorderRadius: "3px",
                                          MozBorderRadius: "3px",
                                          backgroundColor: "#30ada5",
                                          borderTop: "16px solid #30ada5",
                                          borderBottom: "16px solid #30ada5",
                                          borderRight: "22px solid #30ada5",
                                          borderLeft: "22px solid #30ada5",
                                          display: "inline-block",
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
