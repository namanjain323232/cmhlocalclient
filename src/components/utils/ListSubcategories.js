import React, { useState, useEffect } from "react";
import { fetchSubcategories } from "../../actions/subcategory";
import { Link } from "react-router-dom";

const ListSubcategories = (props) => {
  const [subcat, setSubcat] = useState([]);

  useEffect(() => {
    fetchSubcategories().then((res) => {
      let categorySubcat = res.data.filter(
        (subcategoryval) => subcategoryval.category._id === props.categoryValue
      );
      setSubcat(categorySubcat);
    });
  }, []);

  const renderSubcategories = () => {
    return subcat.map((subcategoryval, i) => {
      if (subcategoryval.category._id) {
        if (subcategoryval.category._id === props.categoryValue && i < 2) {
          return (
            <div
              key={subcategoryval._id}
              className="mb-1"
              style={{ marginLeft: "0.5rem", fontSize: "1rem" }}
            >
              <Link to={`/vendorcat/${subcategoryval.slug}`}>
                {subcategoryval.name}{" "}
              </Link>
            </div>
          );
        }
      }
    });
  };

  return <div>{renderSubcategories()}</div>;
};
export default ListSubcategories;
