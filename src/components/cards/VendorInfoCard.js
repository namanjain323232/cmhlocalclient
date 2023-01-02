import React from "react";
import {Card} from "antd";
import {Link} from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const {Meta} = Card;

const VendorInfoCard = ({vendor}) => {
    console.log("values from VENDOR", {vendor})
    const {_id,name, houseNo, addressLine1, addressLine2,city,county,country,postcode,website} = vendor;
  return (
      <Card  title= {name} style={{ width: 300 }}
      actions= {[ <Link to= {`/admin/vendors/vendorinfoedit/${_id}`}>
                      <EditOutlined  className= "text-warning" />
                      </Link>,
                     <Link to= {`/vendor/vendorinfodelete/${_id}`}>
                      <DeleteOutlined  className= "text-danger" />
                      </Link>
                 ]}
      >
       <p>{houseNo} ,{addressLine1} </p>      
       <p>{addressLine2}</p>
       <p>{city}</p>
       <p>{county} ,  {country}</p>
       <p>{postcode}</p>
        <Meta title= {website} />
      </Card>
  )
}

export default VendorInfoCard;
