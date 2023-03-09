import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import {
  AreaChartOutlined,
  PlusCircleOutlined,
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
    active
  } = cat;
  console.log("VENDOR AREAS COVERED",cat);
  return (
   
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : ""}
          style={{ height: "150px", objectFit: "cover" }}
        />
      }
      actions={[
        <Link to={`/admin/vendoradmin/vendoradmincatadd/${_id}`}>
          <PlusCircleOutlined className="text-warning" />
        </Link>,
        <Link to={`/admin/vendoradmin/vendoradmincatedit/${_id}`}>
        <EditOutlined className="text-warning" />
      </Link>,
         active == true ? (
          <Link
            to={`/admin/vendoradmin/vendoradmincatdel/${_id}`}
            className="btn btn-danger mr-1"
          >
            {" "}
            Deactivate
          </Link>
        ) : (
          <Link
            to={`/admin/vendoradmin/vendoradmincatdel/${_id}`}
            className="btn btn-danger mr-1"
          >
            {" "}
            Activate
          </Link>
        )
       
      ]}
    >
      <p className="font-weight-bold">{vendorInfoId.name}</p>
      {subcategories.length && subcategories.map((sc) => <p>{sc.name}</p>)}

      <p>{description && description.substring(0, 50)}....</p>
      <div>
      {areasCovered.map((area, index) => {
              if (areasCovered.length !== index + 1)
                return area.place_add.split(",")[0] + ", ";
              else return area.place_add.split(",")[0];
            })}
      </div>
      
    </Card>
  );
};

export default AdminVendorCard;
