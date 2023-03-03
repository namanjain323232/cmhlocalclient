import React, { useState, useEffect } from "react";
import UserNav from "../navigation/UserNav";
import ConnectNav from "../navigation/ConnectNav";
import { getUserOrders, cancelOrder } from "../../actions/user";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../order/Invoice";
import moment from "moment";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

const UserHistory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  const [cancelModal, setCancelModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () => {
    getUserOrders(user.token)
      .then((res) => {
        setOrders(res.data);
        // console.log("orders checking");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showEachOrder = () =>
    orders.map((order, i) => (
      <div className="card m-2" key={i} style={{ border: "none" }}>
        <h6 style={{ fontWeight: "600" }}>Order #{order._id}</h6>
        {/* <ShowPaymentInfo order={order} /> */}
        {showOrdersInTable(order)}
        <div className="row">
          {/* <div className="col">
               {showDownloadLink(order)}
             </div> */}
        </div>
      </div>
    ));

  const showOrdersInTable = (order) => (
    <table className="table table-bordered  h6">
      <thead className="thead-light">
        <tr>
          <th
            scope="col"
            style={{ backgroundColor: "#1890FF", color: "white" }}
          >
            Helper Name{" "}
          </th>
          <th
            scope="col"
            style={{ backgroundColor: "#1890FF", color: "white" }}
          >
            Sub Category{" "}
          </th>
          <th
            scope="col"
            style={{ backgroundColor: "#1890FF", color: "white" }}
          >
            Hourly Price
          </th>
          <th
            scope="col"
            style={{ backgroundColor: "#1890FF", color: "white" }}
          >
            Booking Date
          </th>
          <th
            scope="col"
            style={{ backgroundColor: "#1890FF", color: "white" }}
          >
            Timeslot
          </th>
          <th
            scope="col"
            style={{ backgroundColor: "#1890FF", color: "white" }}
          >
            Amount
          </th>
          <th
            scope="col"
            style={{ backgroundColor: "#1890FF", color: "white" }}
          >
            Cancel | Rebook
          </th>
        </tr>
      </thead>
      <tbody>
        {order.vendors.map((v, i) => (
          <tr key={i}>
            <td>
              <b>{v.vendor.vendorInfoId.name}</b>
            </td>
            <td>
              <b>{v.vendor.subcategories[0].name}</b>
            </td>
            <td>
              <b>£{v.vendor.price}</b>
            </td>
            <td>
              <b>{moment(order.bookingDate).format("DD/MM/YYYY")}</b>
            </td>
            <td>
              <b>
                {order.timeslotsSE[0].start} -{" "}
                {order.timeslotsSE[order.timeslotsSE.length - 1].end}
              </b>
            </td>
            <td>
              <b>£{v.vendor.price * v.count}</b>
            </td>
            <td>
              <b>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <CloseOutlined
                    onClick={() => {
                      setCancelModal(true);
                    }}
                  />

                  <EditOutlined
                    onClick={() => {
                      setEditModal(true);
                    }}
                  />
                </div>
              </b>
            </td>
            <Modal
              title="Cancel Booking"
              centered
              visible={cancelModal}
              onOk={() => {
                cancelOrder(order._id).then((res) => {
                  loadUserOrders();
                });
                setCancelModal(false);
                toast.success("Your Order has been successfully cancelled...");
              }}
              onCancel={() => {
                setCancelModal(false);
              }}
            >
              Are you sure you wish to cancel booking?
            </Modal>

            <Modal
              title="Re-book Order"
              centered
              visible={editModal}
              onOk={() => {
                cancelOrder(order._id).then((res) => {
                  window.location.assign(`/bookvendor/${v.vendor._id}`);
                });
                setEditModal(false);
              }}
              onCancel={() => {
                setEditModal(false);
              }}
            >
              Are you sure you wish to re-book your booking?
            </Modal>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      filename="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      PDF Download
    </PDFDownloadLink>
  );
  return (
    <div className="container-fluid">
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>
      <div className="row ml-0 text-align-top">
        <div className="col-md-2">
          <UserNav />
        </div>

        <div className="col ">
          {orders.length ? <h3> Orders List</h3> : <h3> No Orders</h3>}
          {showEachOrder()}
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
