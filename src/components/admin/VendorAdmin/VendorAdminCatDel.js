import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminMenu from "../AdminMenu";
import Modal from "../../Modal";
import history from "../../../history";
import { toast } from "react-toastify";
import {
  changeVendorStatus,
  getAllVendorCategories,
  getVendorCategory,
} from "../../../actions/vendor";

const VendorAdminCatDel = (props) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vendor, setVendor] = useState("");
  const id = props.match.params.id;

  useEffect(() => {
    setLoading(true);
    loadVendorCategories();
    loadAllVendorCategories();
    setLoading(false);
  }, []);

  {console.log("PARAM FROM DEL", props.match)}

  const loadAllVendorCategories = () => {
    getAllVendorCategories().then((res) => setVendors(res.data));
  };

  const loadVendorCategories = () => {
     getVendorCategory(id)
      .then((v) => {      
      console.log("Vendor details", JSON.stringify(v.data.vendorInfoId.slug, null, 4));
      setVendor(v.data)
      }     
    )
  };

  
  const addRoute = () => {
    return "/admin/vendoradmin/vendoradmincatlist";
  };
  const handleDelete = () => {
    setLoading(true);
    console.log("ID & Token", id, user.token);
    changeVendorStatus(id, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`vendor Category status changed successfully: ${id}`);
        getAllVendorCategories();
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Could not change status of the vendor category for:${id}`);
      });
  };

  const renderActions = () => {
    return (
      <React.Fragment>
        <button
          onClick={() => {
            handleDelete();
          }}
          type="submit"
          className=" btn btn-danger primary-button mr-3"
        >
          Yes
        </button>
        { (!vendor.vendorinfoId === undefined) }
        
        <Link
          // to={`/admin/vendoradmin/vendoradmincatlist/${vendor.vendorInfoId.slug}`}
          to={`/admin/vendoradmin/vendoradmincatlist/${id}`}
          type="button"
          className="btn btn-secondary primary-button"
        >
          No
        </Link>   
      
      
      </React.Fragment>
    );
  };

  const renderContent = () => {
    
    if (!id) {
      return "Are you sure you want to deactivate this vendor category?";
    }
    // return `Are you sure you want to deactivate the vendor category: ${vendor.subcategories[0].name}`;
  };

  return (
    <div>
     
      <AdminMenu addRoute={addRoute()} />         
      <Modal         
        title="Change status of Vendor Categories"
        content={renderContent()}
        actions={renderActions()}
        onDismiss={() => history.push(`/admin/vendoradmin/vendoradmincatlist/${vendor.vendorInfoId.slug}`)}
      />
     
    </div>
  );
};

export default VendorAdminCatDel;
