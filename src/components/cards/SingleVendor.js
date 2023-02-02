import React, { useState, useEffect } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import VendorListItems from "./VendorListItems";
import StarRatings from "react-star-ratings";
import StarRatingModal from "../Modal/StarRatingModal";
import { showAverageRating } from "../../actions/rating";
import _ from "lodash";
import BookVendor from "../pages/BookVendor";
import { getVendorCategory } from "../../actions/vendor";

const { TabPane } = Tabs;

const SingleVendor = ({ vendorProp, onRatingClick, rating, review, id }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [vendor, setVendor] = useState(vendorProp);
  const [vendorReviews, setVendorReviews] = useState([]);
  const [ok, setOk] = useState(false);
  const [revCount, setRevCount] = useState(4);
  const dispatch = useDispatch();

  const { _id, vendorInfoId, images, ratings } = vendor;

  {
    console.log(ratings);
    console.log(vendorReviews);
    console.log("vendor from single vendor XXXX", vendor);
  }
  useEffect(() => {
    setVendorReviews(vendorProp.ratings?.slice(revCount * -1));
  }, [ok]);
  useEffect(() => {
    setTimeout(() => {
      setOk(!ok);
    }, 200);
  }, []);

  const rerenderParentCallback = () => {
    setLoading(true);
    getVendorCategory(id)
      .then((res) => {
        setVendor(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddToCart = ({ vendor }) => {
    <BookVendor vendor={vendor} />;
  };
  const showmoreRev = () => {
    setRevCount((cnt) => cnt + 4);

    setTimeout(() => {
      setOk(!ok);
    }, 200);
  };
  return (
    <div className="row">
      <div className="col col-md-6">
        <Carousel showArrows={true} autoPlay infiniteLoop>
          {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
        </Carousel>
      </div>

      <div className="col col-md-6 font-weight-bold h6">
        {vendor ? (
          <h1 className="bg-info p-3">{vendorInfoId.name}</h1>
        ) : (
          <h1>Loading...</h1>
        )}
        {vendor && vendor.ratings && vendor.ratings.length > 0 ? (
          showAverageRating(vendor)
        ) : (
          <div className="d-flex justify-content-center mt-1 mb-3">
            "No rating yet"
          </div>
        )}
        <Card
          actions={[
            // <Tooltip title= {tooltip}>
            //  <a onClick= {handleAddToCart}>
            //   <ShoppingCartOutlined  className= "text-info" /><br />Select Vendor
            //   </a>
            // </Tooltip>,
            <Link to={`/bookvendor/${_id}`}>
              <ShoppingCartOutlined className="text-info" />
              <br />
              Select Vendor
            </Link>,
            <StarRatingModal
              review={review}
              rerenderParentCallback={rerenderParentCallback}
            >
              <StarRatings
                starRatedColor="red"
                noOfStars={5}
                rating={rating}
                changeRating={onRatingClick}
                name={_id}
                isSelectable={true}
              />
            </StarRatingModal>,
          ]}
        >
          <VendorListItems vendor={vendor} />
        </Card>
      </div>
      <div className="row">
        <Tabs type="card">
          <TabPane tab="More Details" key="1">
            For any further queries, please call us on XXXX-XXX-XXXX
          </TabPane>
        </Tabs>
      </div>
      <section id="testimonials">
        {/*heading-*/}
        <div className="testimonial-heading">
          <span>Reviews</span>
        </div>
        {/*testimonials-box-container----*/}
        <div className="testimonial-box-container">
          {vendor ? (
            vendorReviews
              .slice(0)
              .reverse()
              .map((r, i) => (
                <div className="testimonial-box">
                  <div
                    className="box-top"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div className="profile">
                      <div
                        className="name-user"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <strong>{r.name}</strong>
                        <div className="reviews">
                          {r.star > 0 ? <i className="fas fa-star" /> : <i />}
                          {r.star > 1 ? <i className="fas fa-star" /> : <i />}
                          {r.star > 2 ? <i className="fas fa-star" /> : <i />}
                          {r.star > 3 ? <i className="fas fa-star" /> : <i />}
                          {r.star > 4 ? <i className="fas fa-star" /> : <i />}
                        </div>
                        <div>
                          {new Date(r.createdAt).toLocaleDateString([], {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*Comments--------------------------------------*/}
                  <div
                    className="client-comment"
                    style={{ textAlign: "center" }}
                  >
                    <p>{r.review}</p>
                  </div>
                </div>
              ))
          ) : (
            <h1>Loading...</h1>
          )}
          {}
        </div>
        <div>
          <button style={{ cursor: "pointer" }} onClick={showmoreRev}>
            <h4>Show more Reviews</h4>
          </button>
        </div>
      </section>
    </div>
  );
};

export default SingleVendor;
