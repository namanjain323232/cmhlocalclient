import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import {
  AreaChartOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const AdminVendorCard = ({ cat }) => {
  const {
    vendorInfoId,
    description,
    category,
    subcategories,
    images,
    _id,
    areasCovered,
  } = cat;
  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : ""}
          style={{ height: "150px", objectFit: "cover" }}
        />
      }
      actions={[
        <Link to={`/admin/vendoradmin/vendoradmincatedit/${_id}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <Link to={`/admin/vendoradmin/vendoradmincatdel/${_id}`}>
          <DeleteOutlined className="text-danger" />
        </Link>,
      ]}
    >
      <p className="font-weight-bold">{vendorInfoId.name}</p>
      {subcategories.length && subcategories.map((sc) => <p>{sc.name}</p>)}

      <p>{description && description.substring(0, 50)}....</p>
      <div>
        
        {areasCovered.length && areasCovered.map((ac) => 
          <p>{ac.place_add}</p>)
         
          }
      </div>
    </Card>
  );
};

export default AdminVendorCard;
