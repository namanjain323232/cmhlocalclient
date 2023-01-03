import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { StarOutlined } from "@ant-design/icons";

const StarRatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  let history = useHistory();
  let params = useParams();

  console.log("children", { children });

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
          setModalVisible(false);
          toast.success(
            "Thank you for your review. It will appear on our website shortly"
          );
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default StarRatingModal;
