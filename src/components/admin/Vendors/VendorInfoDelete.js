import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import AdminMenu from "../AdminMenu";
import Modal from "../../Modal";
import history from "../../../history";
import { toast } from "react-toastify";
import {fetchVendorInfo, fetchVendorsInfo} from "../../../actions/vendorInfo";


const VendorInfoDelete = () => {

    const {user} = useSelector( state => ({...state}));
    const [vendorsinfo, setVendorsinfo] = useState([]);

    useEffect( () => {
        getVendorsInfo();
    });
    
    const getVendorsInfo= () => {
           fetchVendorsInfo().then ( res => setVendorsinfo(res.data));
    }
    const renderActions = () => {
       
        return (
           <React.Fragment>
           <button onClick= { () => {handleDelete()}    } 
              type="submit" className=" btn btn-danger primary-button mr-3">Yes</button>
           <Link to= "/admin/vendors/vendorinfolist" 
                 type="button" className= "btn btn-secondary primary-button">No</Link>
           </React.Fragment>
           );
        }
  
      const renderContent= () => {
         
         if(!slug) {
            return ("Are you sure you want to delete this vendor?");
         }
            return(`Are you sure you want to delete the vendor: ${slug}`);
        }

  return (
    <div>
       <AdminMenu  
        addRoute= {addRoute()}
        />         
        <Modal 
            title= "Delete Vendor Information"
            content= {renderContent()}
            actions= {renderActions()}
            onDismiss = {() => history.push("/vendor/vendorinfolist") }
         />
    </div>    
  );

    
}

export default VendorInfoDelete;