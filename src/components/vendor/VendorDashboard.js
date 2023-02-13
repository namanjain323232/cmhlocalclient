import React, { useState, useEffect } from "react";
import VendorNav from "../navigation/VendorNav";
import ConnectNav from "../navigation/ConnectNav";
import { useSelector } from "react-redux";
import { ToolOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { createConnectAccount } from "../../actions/stripe";
import { getVendorCategoriesUser } from "../../actions/vendor";
import ShowVendorBookings from "../booking/ShowVendorBookings";
import { Card } from "antd";

const { Meta } = Card;

const VendorDashboard = ({ history }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);

  {
    console.log("User data from vendor dashboard", user._id, user.email);
  }

  useEffect(() => {
    loadVendorDetails();
  }, []);

  const loadVendorDetails = () => {
    getVendorCategoriesUser(user._id).then((res) => setVendors(res.data));
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await createConnectAccount(user.token);
      console.log("RES", res);
      window.location.href = res.data;
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Stripe connect failed. Please try again");
      setLoading(false);
    }
  };

  const connectedVendor = () => (
    <div className="row ml-0 text-align-top">
      <div className="col-md-3 mt-2 ">
        <VendorNav />
      </div>
      <div className="col col-md-9 ">
        <div className="row d-flex justify-content-center">
          <ShowVendorBookings user={user._id} />
          {/* <h2 className= "font-weight-bold mb-2 mt-2 "> Your Current Categories</h2>
           <br /> */}
        </div>
        <div className="row d-flex justify-content-center mt-3">
          <div className="col d-flex m-2">
            {/* {JSON.stringify(vendors)} */}
            {vendors &&
              vendors.map((v) => (
                <Card
                  key={v._id}
                  cover={
                    <img
                      key={v._id}
                      src={v.images && v.images.length ? v.images[0].url : ""}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  }
                >
                  <p>{v.vendorInfoId.name}</p>
                  <p>{v.vendorInfoId.email}</p>
                  <p>{v.subcategories[0].name}</p>
                  <Meta
                    title={`Price-£${v.price} ${v.pricetype}`}
                    description={v.subcats}
                  />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const notConnectedVendor = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-md-6 offset-3 text-center">
          <div className="p-5 pointer">
            <ToolOutlined className="h2" />
            <h4 className="font-weight-bold ">
              {" "}
              Setup payouts to add your jobs
            </h4>
            <p className="lead">
              {" "}
              Compare my helper partners with stripe to transfer your earnings
              to your bank account
            </p>
            <button
              className="btn btn-primary mb-3"
              disabled={loading}
              onClick={handleClick}
            >
              {" "}
              {loading ? "Processing..." : "Setup Payouts"}
            </button>
            <p className="text-muted">
              <small className="font-weight-bold">
                {" "}
                *You will be redirected to stripe to complete the onboarding
                process
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>
      {user && user.stripe_seller && user.stripe_seller.charges_enabled
        ? connectedVendor()
        : notConnectedVendor()}
    </>
  );
};

export default VendorDashboard;
