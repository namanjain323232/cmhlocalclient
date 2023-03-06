import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import AdminMenu from "../AdminMenu";
import Modal from "../../Modal";
import history from "../../../history";
import { toast } from "react-toastify";
import {deleteVendor, getAllVendorCategories, getVendorCategory} from "../../../actions/vendor";


const VendorAdminCatDel = (props) => {

    const {user} = useSelector( state => ({...state})); 
    const [vendors, setVendors] = useState([]);
    const [loading,setLoading] = useState(false);
    const [ vendor, setVendor] = useState("");
    const id = props.match.params.id;
    
   
    useEffect ( () => {
       loadVendorCategories();
       loadAllVendorCategories();      
    }, []);

    const loadAllVendorCategories= () => {         
        getAllVendorCategories()
          .then ( (res) => setVendors(res.data));          
          };

    const loadVendorCategories= () => {
        getVendorCategory(id)
        .then ( (v) => setVendor(v.data))
        .catch ( (err) => {
            console.log(err);
            toast.error("No vendor category was found");
        })
    }
    
    // const slug= vendor.vendorInfoId.slug;
     const addRoute= () => {
        return("/admin/vendoradmin/vendoradmincatlist");
     } 
    const handleDelete = () => {
        setLoading(true);
        console.log("ID & Token", id,user.token);
        deleteVendor(id, user.token)
       .then ( res => {
          setLoading(false);
          toast.success(`vendor Category deleted successfully: ${id}`);
          getAllVendorCategories(); 
       })          
        .catch( (err) => {
            console.log(err);
            toast.error(`Could not delete the vendor category for:${id}`)
        })
    }

    const renderActions = () => {
       
        return (           
           <React.Fragment>
          
           <button onClick= { () => {handleDelete()}    } 
              type="submit" className=" btn btn-danger primary-button mr-3">Yes</button>
           <Link to= {`/admin/vendoradmin/vendoradmincatlist/${id}`}
                 type="button" className= "btn btn-secondary primary-button">No</Link>
           </React.Fragment>
           );
        }
  
      const renderContent= () => {
         
          if(!id) {
            return ("Are you sure you want to delete this vendor category?");
         }
            return(`Are you sure you want to delete the vendor category: ${vendor.subcategories[0].name}`);
         }

  return (   
     <div>
       <AdminMenu  
        addRoute= {addRoute()}
        />    
            
        <Modal 
            title= "Delete Vendor Categories"
            content= {renderContent()}
            actions= {renderActions()}
            onDismiss = {() => history.push("/admin/vendoradmin/vendoradmincatlist") }
         />
    </div>    
    
  );
    
}

export default VendorAdminCatDel;