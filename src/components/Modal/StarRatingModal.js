import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { StarOutlined } from "@ant-design/icons";
import { vendorReview } from "../../actions/vendor";

const StarRatingModal = (props) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  const [review, setReview] = useState(props.review);
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };
  let history = useHistory();
  let params = useParams();

  // console.log("children", { children });

  const handleChange = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/vendordetails/${params.id}` },
      });
    }
  };

  return (
    <>
      <div onClick={handleChange}>
        <StarOutlined className="text-danger" /> <br />{" "}
        {user ? "Leave a rating" : "Login to leave a rating"}
      </div>
      <Modal
        title="Leave a rating for the vendor"
        centered
        visible={modalVisible}
        onOk={() => {
          vendorReview(params.id, review, user.token);
          setModalVisible(false);
          function reviewLoad() {
            props.rerenderParentCallback();
          }
          setTimeout(reviewLoad, 3000);
          toast.success(
            "Thank you for your review. It will appear on our website shortly"
          );
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        {props.children}
        <textarea
          value={review}
          className="textarea-review"
          placeholder="Please leave a review"
          onChange={handleReviewChange}
        />
      </Modal>
    </>
  );
};

export default StarRatingModal;
