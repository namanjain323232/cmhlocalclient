import _ from "lodash";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchSubcategory,
  editSubcategory,
} from "../../../actions/subcategory";
import { fetchCategories } from "../../../actions/category";
import AdminMenu from "../AdminMenu";
import AdminNav from "../../navigation/AdminNav";
import SubcategoriesForm from "./SubcategoriesForm";
import { toast } from "react-toastify";

const SubcategoriesEdit = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [hide, setHide] = useState("");
  const [type,setType] = useState("");
  const [loading, setLoading] = useState(false);
  const slug = match.params.slug;

  useEffect(() => {
    getSubcat();
  }, []);

  const getSubcat = () => {
    fetchSubcategory(slug).then((res) => {
      console.log("value from res", res.data);
      setCategory(res.data.category);
      setName(res.data.name);
    });
  };

  const addRoute = () => {
    return "/admin/subcategories/subcategoriescreate";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("VALUES from subcat", slug, category, name);
    editSubcategory(slug, { name: name, category: category, hide:hide, type:type }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`Subcategory updated successfully:${res.data.name}`);
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
      <div className="col col-md-2">
        <AdminNav />
      </div>
      <div className="col col-md-9">
        <AdminMenu addRoute={addRoute()} />

        {loading ? (
          <h1>Loading......</h1>
        ) : (
          <h1 className="category-head font-weight-bold card-header">
            Edit Sub Categories{" "}
          </h1>
        )}
        {console.log("category from subcat", category, name,hide,type)}
        <div className="card  mb-2">
          <div className=" card-body mb-1 ">
            <SubcategoriesForm
              handleSubmit={handleSubmit}
              category={category}
              setCategory={setCategory}
              name={name}
              setName={setName}
              hide={hide}
              setHide={setHide}
              type={type}
              setType={setType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategoriesEdit;
