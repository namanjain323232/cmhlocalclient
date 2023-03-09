import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminNav from "../../navigation/AdminNav";
import { addVendor } from "../../../actions/vendor";
import VendorAdminCatAddForm from "./VendorAdminCatAddForm";
import { fetchCategories, fetchCategorySubs } from "../../../actions/category";
import { fetchVendorInfoByVen } from "../../../actions/vendorInfo";
import FileUpload from "../../utils/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const VendorAdminCatAdd = ({ match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  {
    // console.log("MATCH FROM CAT ADD", match.params.id);
  }
  const initialState = {
    userId: user._id,
    vendorInfoId: "",
    description: "",
    categories: [],
    category: "",
    subcategories: [],
    subcategory: "",
    price: "",
    pricetypes: ["Hourly", "Job", "Daily"],
    pricetype: "Hourly",
    images: [],
  };
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [showSubs, setShowSubs] = useState(false);
  const [vendor, setvendor] = useState("");
 

  useEffect(() => {
    getCategories();
    getVendorInfo();
  }, []);

  const getCategories = () => {
    fetchCategories().then((res) =>
      setValues({ ...values, subcategories: [], categories: res.data })
    );
  };

  const getVendorInfo = () => {
    setLoading(true);
    fetchVendorInfoByVen(match.params.id)
      .then((v) => {
        setLoading(false);
        setvendor(v.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(`Vendor info not found for user: ${match.params.id}`);
      });
  };
  // console.log("VENDOR INFO BY ID OUTPUT",vendor._id);
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      vendorInfoId: vendor._id,
    });
  };

  // console.log("Values from handlechange in CAT ADD", values,vendor._id);

  const handleCategoryChange= (e) => {
    e.preventDefault();   
    setValues({ ...values,subcategories: [], category: e.target.value});
    fetchCategorySubs(e.target.value)
    .then ( (res) => {      
      setSubOptions(res.data)
    })
    .catch ( (err) => {
       console.log(err);
    })
    setShowSubs(true);
  }
  // {console.log(subOptions)}
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Values before submit", values);
    setValues({ ...values, vendorInfoId: vendor._id, userId: user._id });
    setLoading(false);

    addVendor(values, user.token)
      .then((res) => {
        setLoading(false);
        window.alert(`Vendor Catgory is created successfully !!!!`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response);
      });
  };

  return (
    <div className="row">
      <div className="col col-md-2">
        <AdminNav />
      </div>
      <div className="col col-md-10">
        <section className="vendor-center">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h2 className="card-header font-weight-bold">
              Add Vendor Categories
            </h2>
          )}

          <div className="card ">
            <div className=" card-body mb-1 ">
              <div className="p3">
                <FileUpload
                  values={values}
                  setValues={setValues}
                  setLoading={setLoading}
                />
              </div>
              {console.log("Values being passed to Admin Card:",vendor._id,vendor.name)}
              <VendorAdminCatAddForm              
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                vendorInfoId={vendor._id}
                vendorName= {vendor.name}
                userId={user._id}
                values={values}
                setValues={setValues}
                handleCategoryChange={handleCategoryChange}
                subOptions= {subOptions}
                showSubs= {showSubs}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VendorAdminCatAdd;
