import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../actions/category";
import { fetchSubcategories } from "../actions/subcategory";
import ListSubcategories from "./utils/ListSubcategories";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import PostcodeSearch from "./utils/PostcodeSearch";
import { Avatar, Card, Col, Row } from "antd";
import Jumbotron from "./cards/Jumbotron";
import { getAllVendorCategories } from "../actions/vendor";
import { fetchVendorsInfo } from "../actions/vendorInfo";
import DemoCarousel from "./Promoted";

const { Meta } = Card;
const gridStyle = {
  height: "200px",
  textAlign: "left",
  border: "none",
};

const MainBody = () => {
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [vendorinfo, setVendorinfo] = useState([]);

  useEffect(() => {
    getSubcat();
  }, []);

  useEffect(() => {
    getAllVendorCategories().then((res) => setVendors(res.data));
  }, []);

  useEffect(() => {
    fetchVendorsInfo().then((res) => setVendorinfo(res.data));
  }, []);

  // console.log("ALL VENDORS", vendors);
  // console.log("ALL VENDOR INFO", vendorinfo);

  const getSubcat = () => {
    fetchCategories().then((res) => setCategories(res.data));
  };
  const renderFields = () => {
    return (
      categories &&
      categories.map((categoryval) => {
        if (categoryval._id) {
          return (
            // <div className= "col col-md-3 main-class font-weight-bold p-1 d-flex justify-content-right "
            <Col
              span={8}
              key={categoryval._id}
              className="main-class font-weight-bold p-1 d-flex"
              style={{
                backgroundImage: `linear-gradient(90deg, #ead6cd 0%, #ead6cd 65%, transparent 50%), url(${categoryval.imgURL})`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "80%"                 
                }}
              >
                <Link
                  to={`/vendordetails/${categoryval.slug}`}
                  className="font-weight-bold h5 text-dark ml-2"
                >
                  {categoryval.name}
                </Link>
                {/* <Col span={12} className="btn btn-raised font-weight-bold mt-2"> */}
                <ListSubcategories categoryValue={categoryval._id} />
                {/* </Col> */}
                <div
                  style={{
                    marginLeft: "0.5rem",
                    fontSize: "0.8rem",
                    color: "#00008B"                   
                  }}
                >
                  View More ...
                </div>
              </div>
              {/* <Col span={8} className="ml-4"> */}
              {/* <Avatar src={categoryval.imgURL} size={60} /> */}
              {/* </Col> */}
            </Col>
            //  </div>
          );
        }
      })
    );
  };

  return (
    <>
      <section className="testimonial-section" style={{ padding: "0px" }}>
        <Row align="middle">
          <Col
            span={24}
            className="jumbotron-fluid font-weight-bold h1 text-danger mb-1 d-flex justify-content-center"
          >
            <Jumbotron
              text={[
                "We will find the best helper for your needs in your area",
                "Compare the price to find the most affordable helper",
                "So easy to use that you will have your help sorted in minutes",
              ]}
            />
          </Col>
        </Row>
      </section>
      <section className="feature-class" id="features">
        <Col className="font-weight-bold mt-1 ">
          <PostcodeSearch />
        </Col>
      </section>
      <div style={{ display: "flex" }}>
        <section className="content-section">
          <Row>{renderFields()}</Row>
        </section>
        <DemoCarousel />
      
      </div>
    </>
  );
};

export default MainBody;
