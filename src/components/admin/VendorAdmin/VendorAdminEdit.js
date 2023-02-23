import _ from "lodash";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchRegVendorSlug, editRegVendor } from "../../../actions/vendorInfo";
import AdminMenu from "../AdminMenu";
import AdminNav from "../../navigation/AdminNav";
import VendorAdminForm from "./VendorAdminForm";
import { toast } from "react-toastify";

const VendorAdminEdit = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [address1, setAddress1] = useState([]);
  const [values, setValues] = useState([]);

  const slug = match.params.slug;
  console.log("VALUE OFSLUG", match.params);

  useEffect(() => {
    getVendorInfo();
  }, []);

  const getVendorInfo = () => {
    fetchRegVendorSlug(slug).then((res) => {
      setValues(res.data);
    });
  };

  const addRoute = () => {
    return "/admin/categories/categoriescreate";
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name, ".....", e.target.value);
  };

  const {
    active,
    email,
    mobileNo,
    altContactNo,
    postcode,
    name,
    houseNo,
    addressLine1,
    addressLine2,
    city,
    county,
    country,
    website,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    editRegVendor(slug, { values }, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.name} is updated successfully`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response === 400) toast.error(err.response.data);
        else toast.error(err.response);
      });
  };

  return (
    <div className="row">
      <div className="col col-md-3">
        <AdminNav />
      </div>
      <div className="col col-md-6">
        <AdminMenu addRoute={addRoute()} />
        <section className="vendor-center">
          {loading ? (
            <h4>Loading....</h4>
          ) : (
            <h4 className="card-header font-weight-bold">
              {" "}
              Change Vendor Details{" "}
            </h4>
          )}
          <div className="card mb-1">
            <div className=" card-body mb-1 ">
              <VendorAdminForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                email={email}
                name={name}
                mobileNo={mobileNo}
                altContactNo={altContactNo}
                postcode={postcode}
                houseNo={houseNo}
                addressLine1={addressLine1}
                addressLine2={addressLine2}
                city={city}
                county={county}
                country={country}
                website={website}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VendorAdminEdit;
