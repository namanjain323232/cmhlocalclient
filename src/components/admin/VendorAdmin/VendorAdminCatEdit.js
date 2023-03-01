import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminNav from "../../navigation/AdminNav";
import { fetchCategories, fetchCategorySubs } from "../../../actions/category";
import { getVendorCategory, updateVendorAdmin } from "../../../actions/vendor";
import VendorAdminCatForm from "./VendorAdminCatForm";
import FileUpload from "../../utils/FileUpload";

const VendorEdit = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrOfSubIds, setArrOfSubIds] = useState([]);
  const [arrOfAreas, setArrOfAreas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const initialState = {
    userId: user._id,
    vendorInfoId: "",
    description: "",
    category: "",
    subcategories: [],
    subcategory: "",
    price: "",
    pricetypes: ["Hourly", "Job", "Daily"],
    pricetype: "",
    areasCovered: [],
    images: [],
  };

  const [values, setValues] = useState(initialState);
  console.log("values before set", values);

  useEffect(() => {
    loadAreas();
    loadVendorCategory();
    loadCategories();
  }, []);

  const loadVendorCategory = () => {
    setLoading(true);

    getVendorCategory(match.params.id)
      .then((cat) => {
        setValues({ ...values, ...cat.data });
        fetchCategorySubs(cat.data.category._id).then((res) =>
          setSubOptions(res.data)
        );
        let arr = [];
        cat.data.subcategories.map((s) => {
          arr.push(s._id);
        });
        console.log("ARR", arr);
        setArrOfSubIds((prev) => arr);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response);
      });
  };

  const loadCategories = () => {
    fetchCategories().then((res) => setCategories(res.data));
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subcategories: [] });
    setSelectedCategory(e.target.value);
    fetchCategorySubs(e.target.value)
      .then((res) => {
        setSubOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    //if the user clicks on the original category, fetch the previously selected subcats
    if (values.category._id === e.target.value) {
      loadVendorCategory();
    }
    setArrOfSubIds([]);
  };

  const loadAreas = () => {
    let arrArea = [];
    values.areasCovered.map((a) => {
      arrArea.push(a.place_id);
    });
    setArrOfAreas((prev) => arrArea);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    values.subcategories = arrOfSubIds;
    values.category = selectedCategory ? selectedCategory : values.category;
    values.areasCovered = arrOfAreas;
    const slug = values.vendorInfoId.slug;
    updateVendorAdmin(match.params.id, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success("Vendor categories updated successfully !!!!");
        history.push(`/admin/vendoradmin/vendoradmincatlist/${slug}`);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  return (
    <div className="row">
      <div className="col col-md-2">
        <AdminNav />
      </div>
      <div className="col col-md-10 ">
        <section className="vendor-center">
          <h2 className="font-weight-bold mb-2">Change Categories </h2>

          <div className="p3 ml-2">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          {/* {JSON.stringify(arrOfAreas)} */}
          <VendorAdminCatForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setvalues={setValues}
            values={values}
            user={user}
            categories={categories}
            subOptions={subOptions}
            arrOfSubIds={arrOfSubIds}
            setArrOfSubIds={setArrOfSubIds}
            arrOfAreas={arrOfAreas}
            setArrOfAreas={setArrOfAreas}
            handleCategoryChange={handleCategoryChange}
            selectedCategory={selectedCategory}
          />
        </section>
      </div>
    </div>
  );
};

export default VendorEdit;
