import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getVendorCategory,
  vendorRating,
  getRelatedVendors,
} from "../../actions/vendor";
import SingleVendor from "../cards/SingleVendor";
import VendorCard from "../cards/VendorCard";

const VendorDetails = ({ match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [vendor, setVendor] = useState("");
  const [loading, setLoading] = useState(false);
  const [star, setStar] = useState(0);
  const [review, setReview] = useState("");
  const [related, setRelated] = useState([]);
  const { id } = match.params;

  useEffect(() => {
    loadVendorDetails();
  }, [id]);

  useEffect(() => {
    if (vendor.ratings && user) {
      let existingRatingObject = vendor.ratings.find(
        (e) => e.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
      existingRatingObject && setReview(existingRatingObject.review);
    }
  });

  const loadVendorDetails = () => {
    setLoading(true);
    getVendorCategory(id)
      .then((res) => {
        setVendor(res.data);
        getRelatedVendors(res.data._id).then((res) => setRelated(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRatingClick = (newRating, name) => {
    setStar(newRating);
    console.log("rating VALUE before update", star, name, user.token);
    vendorRating(name, newRating, user.token).then((res) => {
      console.log("Rating after Update", res);
      //   setStar(newRating);
      // loadVendorDetails();
    });
  };

  return (
    <div className="container">
      <div className="row pt-4">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <SingleVendor
            vendor={vendor}
            onRatingClick={onRatingClick}
            rating={star}
            review={review}
            // loadVendorDetails={loadVendorDetails1}
          />
        )}
      </div>
      <div className="row">
        <div className="col pt-5 pb-5">
          <hr />
          <h4>Other Vendors in your area</h4>
          <hr />
          <div className="row pb-5 ">
            {related.length ? (
              related.map((r) => (
                <div className="col col-md-4" key={r._id}>
                  {" "}
                  <VendorCard vendor={r} />{" "}
                </div>
              ))
            ) : (
              <div className="text-"> </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
