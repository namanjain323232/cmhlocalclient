import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminMenu from "../AdminMenu";
import {
  fetchSubcategories,
  deleteSubcategory,
} from "../../../actions/subcategory";
import Modal from "../../Modal";
import history from "../../../history";
import { toast } from "react-toastify";

const SubcategoriesDelete = (props) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [subcats, setSubcats] = useState([]);
  const slug = props.match.params.slug;

  useEffect(() => {
    getSubcats();
  }, []);

  const getSubcats = () => {
    fetchSubcategories().then((res) => setSubcats(res.data));
  };

  const addRoute = () => {
    return "/admin/subcategories/subcategoriescreate";
  };

  const renderContent = () => {
    if (!subcats) {
      return "Are you sure you want to delete this subcategory?";
    }
    return `Are you sure you want to delete the subcategory: ${slug}`;
  };

  const handleDelete = () => {
    setLoading(true);
    deleteSubcategory(slug, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`Sub catgeory deleted successfully: ${slug}`);
        getSubcats();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response === 400) toast.error(err.response.data);
        else toast.error(err.message);
      });
  };

  const renderActions = () => {
    return (
      <React.Fragment>
        <button
          onClick={handleDelete}
          type="submit"
          className=" btn btn-danger primary-button mr-3"
        >
          Yes
        </button>
        <Link
          to="/admin/subcategories/subcategoriesList"
          type="button"
          className="btn btn-secondary primary-button"
        >
          No
        </Link>
      </React.Fragment>
    );
  };

  return (
    <div>
      <AdminMenu addRoute={addRoute()} />
      <Modal
        title="Delete a SubCategory"
        content={renderContent()}
        actions={renderActions()}
        onDismiss={() => history.push("/admin/subcategories/subcategorieslist")}
      />
    </div>
  );
};

export default SubcategoriesDelete;
