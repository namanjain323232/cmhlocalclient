import React, {useEffect, useState,Fragment} from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { fetchRegVendors,removeRegVendor} from "../../../actions/vendorInfo";
import AdminMenu from "../AdminMenu";
import Modal from "../../Modal";
import history from "../../../history";
import { toast } from "react-toastify";

const VendorAdminDel = (props) =>
{
   const {user} = useSelector( state => ({...state}));
   const [loading, setLoading] = useState(false);
   const [vendors, setVendors] = useState([]);
   const slug = props.match.params.slug;

   useEffect( () => {
       getRegVendors();
   }, [] );

   const getRegVendors = () => {
      fetchRegVendors().then ( (res) => setVendors(res.data));
   }

   const addRoute= () => {
     return("/admin/vendoradmin/vendoradmincreate");
   } 
  
   const handleDelete = () => {
      setLoading(true);
      removeRegVendor(slug)
      .then ( res => {
          setLoading(false);
          toast.success(`Vendor details deatcivated successfully: ${slug}`);
          getRegVendors();           
      })
      .catch ( (err) => {
             console.log(err);
             setLoading(false);
             if(err.response===400) 
                  toast.error(err.response.data);
             else
                  toast.error(err.message);
         });
   }

    const renderActions = () => {
       
      return (
         <React.Fragment>
         <button onClick= { () => {handleDelete()}    } 
            type="submit" className=" btn btn-danger primary-button mr-3">Yes</button>
         <Link to= "/admin/vendoradmin/vendoradminList" 
               type="button" className= "btn btn-secondary primary-button">No</Link>
         </React.Fragment>
         );
    }

    const renderContent= () => {
       if (vendors.active == true)
       {
       if(!slug) {
          return ("Are you sure you want to deactivate this vendor?");
       }
          return(`Are you sure you want to deactivate the vendor: ${slug}`);
      }
      else 
         return (`Are you sure you want to activate the vendor: ${slug}`)
    }
   
   return(
   <div>
       <AdminMenu  
        addRoute= {addRoute()}
        />         
        <Modal 
            title= "Deactivate a Vendor"
            content= {renderContent()}
            actions= {renderActions()}
            onDismiss = {() => history.push("/admin/vendoradmin/vendoradminlist") }
         />
    </div>    
     );
}

export default VendorAdminDel;
