import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../navigation/AdminNav";
import AdminMenu from "../AdminMenu";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchOrders } from "../../../actions/orders";
import moment from "moment";
import SearchBar from "../../utils/searchBar";

const OpenOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    setLoading(true);
    fetchOrders().then((res) => setOrders(res.data));
    setLoading(false);
  };

  const getVendors = async () => {
    setLoading(true);
  }
  const addRoute = () => {
    return "/admin/categories/categoriescreate";
  };

    const searchValue = (keyword) => (res) =>
           res.OrderedBy.toLowerCase().includes(keyword);

  const renderList = () => {
    return (
      orders &&
      orders.map((order) => {
        if (order._id) {
          return (
            <div className="row" key={order._id}>
              <div className="col col-md-3 mb-2 category">
                <p font-weight-bold> {order._id}</p>
                Booking Date:{moment(order.bookingDate).format("DD/MM/YYYY")}
              </div>
              <div className="col col-md-3 mb-2  category">
                <p>{order.orderedBy.email}</p>
                   {order.vendors.length && order.vendors.map((ven) => 
                   <p> Order Total :£{ven.price * ven.count} </p>)}
                 </div>
              {/* {console.log (order.vendors[0].vendor.vendorInfoId, order.bookingDate)} */}
              <div className="col col-md-2 mb-2 category" key={order.vendors._id}>
                {order.vendors &&
                  order.vendors.map((ven) =>           
                    <p> {ven.vendor.vendorInfoId.name}</p>)}
              </div>
              <div className="col col-md-2 mb-2 category">
                {order.timeslotsSE.length &&
                  order.timeslotsSE.map((ts) => (
                    <p>
                      {ts.start}-{ts.end}
                    </p>
                  ))}
              </div>             
              
              <div className="col col-md-1 mb-2 category">
                {order.orderStatus}
              </div>
              <div className="col-md-3 mb-1">
                <Link
                  to={`/admin/categories/categoriesedit/${order._id}`}
                  className="btn btn-primary  mr-1 "
                >
                  <EditOutlined />
                </Link>
                <Link
                  to={`/admin/categories/categoriesdelete/${order._id}`}
                  className="btn btn-danger mr-1 "
                >
                  <DeleteOutlined />
                </Link>
              </div>
            </div>
          );
        }
      })
    );
  };

  return (
    <div className="row">
      <div className="col col-md-2 height=100%">
        <AdminNav />
      </div>
      <div className="col col-md-6 category">
        <AdminMenu addRoute={addRoute()} />
        {!orders ? (
          <h2>Loading.....</h2>
        ) : (
          <h2 className="card-header font-weight-bold mt-2">All Open Orders</h2>
        )}
        {/* {JSON.stringify(orders[0].orderStatus,null," ")}
        <SearchBar
          keyword= {keyword}
          setKeyword = {setKeyword}
         />  */}

        <div className="container-fluid category-center">
          <div className=" row">
            <div className=" col col-md-3">
              <h5 className="float-center font-weight-bold"> Order No/Date</h5>
            </div>
            <div className=" col col-md-3">
              <h5 className="float-center font-weight-bold"> Ordered By</h5>
            </div>

            <div className="col col-md-2">
              <h5 className="float-center font-weight-bold"> Vendor</h5>
            </div>
            <div className="col col-md-2">
              <h5 className="float-center font-weight-bold"> Booking Slots</h5>
            </div>
            <div className="col col-md-1">
              <h5 className="float-center font-weight-bold"> Status</h5>
            </div>
          </div>
        </div>
        <form>{renderList()}</form>
      </div>
    </div>
  );
};

export default OpenOrders;
