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
        if (subcategoryval.category._id === props.categoryValue && i < 3) {
          return (
            <div
              key={subcategoryval._id}
              className="mb-1"
              style={{
                marginLeft: "0.5rem",
                fontSize: "0.8rem"                           
              }}
            >
              <Link to={`/vendorcat/${subcategoryval.slug}`}>
                <p style={{ color: "#00008B",
                            marginBottom: "0.3rem"}}>{subcategoryval.name} </p>
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
