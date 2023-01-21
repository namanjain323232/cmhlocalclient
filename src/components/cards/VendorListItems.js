import { Descriptions } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const VendorListItems = ({ vendor }) => {
  const {
    description,
    price,
    pricetype,
    category,
    vendorInfoId,
    subcategories,
    areasCovered,
  } = vendor;

  return (
    <ul className="list-group">
      {vendorInfoId && (
        <li className="list-group-item">
          Areas Covered{" "}
          <span className="label label-default label-pill float-right">
            {areasCovered.map((area, index) => {
              if (areasCovered.length !== index + 1)
                return area.place_add.split(",")[0] + ", ";
              else return area.place_add.split(",")[0];
            })}
          </span>
        </li>
      )}
      <li className="list-group-item">
        Price{" "}
        <span className="label label-default label-pill float-right">
          £ {price} {pricetype}{" "}
        </span>
      </li>
      <li className="list-group-item">
        About Me:{" "}
        <span className="label label-default label-pill float-right">
          {description}{" "}
        </span>
      </li>
      {category && (
        <li className="list-group-item">
          Category{" "}
          <Link
            to={`/category/${category._id}`}
            className="label label-default label-pill  float-right"
          >
            {category.name}
          </Link>
        </li>
      )}

      {subcategories && (
        <li className="list-group-item">
          Sub Categories{" "}
          {subcategories.map((s) => (
            <Link
              key={s._id}
              to={`/vendorcat/${s.slug}`}
              className="label label-default label-pill mr-2 float-right"
            >
              {s.name}{" "}
            </Link>
          ))}
        </li>
      )}

      {/* <li className="list-group-item">
               Rating{" "} <span className= "label label-default label-pill float-right"> 
                    </span>
           </li> */}
    </ul>
  );
};

export default VendorListItems;
